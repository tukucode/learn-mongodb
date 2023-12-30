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

    const result = await rolesModel.findOneAndDelete({ _id });

    if (!result) return Message(res, 404, "Role id not found");

    Message(res, 200, "Delete data success");
  } catch (error) {
    Message(res, 500, error.message || "Internal server error");
  }
}
