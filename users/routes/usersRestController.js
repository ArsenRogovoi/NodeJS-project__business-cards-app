const express = require("express");
const router = express.Router();
const { handleError } = require("../../utils/errorHandler");
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  editUser,
  changeUserBusinessStatus,
  deleteUser,
} = require("../models/usersAccessData");
const {
  validateRegistration,
  validateLogin,
  validateUserToEdit,
} = require("../validations/userValidationService");
const normalizeUser = require("../helpers/normalizeUser");
const auth = require("../../auth/authService");

router.post("/", async (req, res) => {
  try {
    let user = req.body;

    const { error } = validateRegistration(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    user = await normalizeUser(user);
    user = await registerUser(user);
    return res.send(user).status(201);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    const user = await loginUser(req.body);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all users in the database"
      );
    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    const { status } = error;
    return handleError(res, status || 500, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { _id, isAdmin } = req.user;
    const { id } = req.params;
    if (_id !== id && !isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin type user or the registrated user to see this user"
      );
    const user = await getUser(id);
    return res.send(user);
  } catch (error) {
    const { status } = error;
    return handleError(res, status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let userFromClient = req.body;
    const userIdToEdit = req.params.id;
    const authUser = req.user;

    if (authUser._id !== userIdToEdit)
      return handleError(
        res,
        403,
        "Authorization Error: Signup to edit your data"
      );

    const { error } = validateUserToEdit(userFromClient);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    userFromClient = await normalizeUser(userFromClient);
    userFromClient = await editUser(userIdToEdit, userFromClient);

    return res.send(userFromClient);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    let user = req.user;
    const userId = req.params.id;

    if (user._id !== userId)
      return handleError(
        res,
        403,
        "Authorization Error: Only registrated user can edit his data"
      );

    user = await changeUserBusinessStatus(userId);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { _id, isAdmin } = req.user;
    const userId = req.params.id;

    if (_id !== userId && !isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: Only registrated user or admin can delete this user"
      );

    const user = await deleteUser(userId);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.use((req, res) => handleError(res, 404, "Page not found in users"));

module.exports = router;
