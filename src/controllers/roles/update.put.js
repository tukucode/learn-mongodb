import rolesModel from "../../models/roles.js";
import Message from "../../utils/message.js";
import { ObjectId } from "bson";

import Validation from "../../utils/validation.js";
import { z } from "zod";

const schema = {
  name: z.string().min(1, "Name is required"),
};

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
  const body = req.body;
  const validation = Validation(schema, body);

  if (!validation.success)
    return Message(res, 422, "Error validation", { errors: validation.errors });

  try {
    const _id = new ObjectId(req.params._id);

    const result = await rolesModel.findOneAndUpdate(
      { _id },
      { $set: validation.data }
    );

    if (!result) return Message(res, 404, "Role id not found");

    Message(res, 200, "Update data success");
  } catch (error) {
    Message(res, 500, error.message || "Internal server error");
  }
}
