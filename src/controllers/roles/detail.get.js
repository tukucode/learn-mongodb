import rolesModel from "../../models/roles.js";
import Message from "../../utils/message.js";
import { ObjectId } from "bson";

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
    const _id = new ObjectId(req.params._id);

    const detail = await rolesModel.findOne({ _id });

    Message(res, 200, "Detail data", detail);
  } catch (error) {
    Message(res, 500, error.message || "Internal server error");
  }
}
