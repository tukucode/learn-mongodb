import usersModel from "../../models/users.js";
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
    const _id = req.params._id;

    const payload = { deleted_at: new Date() };

    await usersModel.findOneAndUpdate({ _id, deleted_at: null }, payload, {
      new: true,
    });

    Message(res, 200, "Remove user success");
  } catch (error) {
    Message(res, 500, error.message || "Internal server error");
  }
}
