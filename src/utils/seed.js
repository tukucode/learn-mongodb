import RolesModel from "../models/roles.js";
import UsersModel from "../models/users.js";

export default async function () {
  // FIND DATA ROLE
  const findDataRole = await RolesModel.find();

  if (findDataRole.length === 0) {
    // CREATE DATA ROLES
    const payload = [{ name: "admin" }, { name: "customer" }];
    await RolesModel.create(payload);
  }

  // FIND DATA USER
  const findDataUser = await UsersModel.find();

  if (!findDataUser.length) {
    // FIND DATA WHERE ROLE NAME IS admin
    const findDataAdmin = await RolesModel.findOne({ name: "admin" });
    // const _id = findDataAdmin._id;
    const _id = findDataAdmin._doc._id; // findDataAdmin._id;

    const payload = {
      email: "admin@motor.com",
      password: "password",
      role_id: _id,
    };

    // CREATE DATA USER
    await UsersModel.create(payload);
  }
}
