import usersModel from "../../models/users.js";
import rolesModel from "../../models/roles.js";
import Message from "../../utils/message.js";

import Validation from "../../utils/validation.js";
import { z } from "zod";

const schema = {
  email: z.string().min(1, "Email is required").email("Email must be valid"),
  password: z.string().min(8, "Password must be equal 8 character"),
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
    return Message(res, 422, "Error validation", {
      errors: validation.errors,
    });

  try {
    const findRoleCustomer = await rolesModel.findOne({ name: "customer" });

    if (!findRoleCustomer) return Message(res, 404, "Role not found");

    const { _id } = findRoleCustomer;

    // await usersModel.create({
    //   ...validation.data,
    //   role_id: _id,
    // });

    await new usersModel({
      ...validation.data,
      role_id: _id,
    }).save();

    Message(res, 201, "Create user success");
  } catch (error) {
    Message(res, 500, error.message || "Internal server error");
  }
}
