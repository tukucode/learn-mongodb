import rolesModel from "../../models/roles.js";
import Message from "../../utils/message.js";

/**
 *  @typedef {import('express').Request} ExpressRequest
 *  @typedef {import('express').Response} ExpressResponse
 */

/**
 *
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */

export default async function (req, res) {
  try {
    const q = req.query.q || "";
    const sort_by = req.query.sort_by ? req.query.sort_by : "desc"; // asc = 1 or desc = -1
    const page = req.query.page ? Number(req.query.page) : 1;
    const per_page = req.query.per_page ? Number(req.query.per_page) : 10;

    const skip = page === 1 ? 0 : (page - 1) * per_page;
    const limit = per_page;

    const data = await rolesModel
      .find({ name: { $regex: q, $options: "i" } })
      .sort({ _id: sort_by })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await rolesModel
      .find({ name: { $regex: q, $options: "i" } })
      .count();

    const pagination = {
      page,
      per_page,
      total,
    };

    Message(res, 200, "All data", data, pagination);
  } catch (error) {
    Message(res, 500, error.message || "Internal server error");
  }
}
