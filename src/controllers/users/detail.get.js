import usersModel from "../../models/users.js";
import Message from "../../utils/message.js";
import { Types } from "mongoose";

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
    const _id = req.params._id;

    const data = await usersModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(_id),
          deleted_at: null,
        },
      },
      {
        $lookup: {
          from: "roles",
          foreignField: "_id",
          localField: "role_id",
          as: "role",
        },
      },
      {
        $unwind: "$role",
      },
    ]);

    Message(res, 200, "Detail data", data[0]);
  } catch (error) {
    Message(res, 500, error.message || "Internal server error");
  }
}
