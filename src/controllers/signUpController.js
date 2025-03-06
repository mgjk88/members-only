const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const db = require('../db/queries');

function getForm(req, res) {
  try {
    res.status(200).render("signUp", {success: null, errors: []});
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

async function postForm(req, res) {
  const errors = validationResult(req);
  console.log(errors);
  if(!errors.isEmpty()) {
    res.status(400).redirect('/');
    return;
  }
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    await db.addUser(req.body.fullname, req.body.username, password);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/");
  }
}

const validateForm = [
  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .matches(/([a-zA-Z]+\s{1}[a-zA-Z]+)/)
    .withMessage("First name and last name only"),
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("cnfrm-password")
    .trim()
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((password, { req }) => password === req.body.password)
    .withMessage("Passwords do not match"),
];

module.exports = {
  getForm,
  postForm,
  validateForm
}
