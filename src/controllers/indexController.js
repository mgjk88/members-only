const db = require("../db/queries");
async function getMessages(req, res) {
  const isAuth = req.isAuthenticated();
  let username = "";
  let isMember = false;
  let isAdmin = false;
  let messages = [];

  if (isAuth) {
    isMember = req.user.member;
    isAdmin = req.user.admin;
    username = req.user.username;
  }

  if (isMember) messages = await db.getMessages();
  //array of objects, {message, datetime, username}
  else messages = await db.getMaskedMessages(); //array of objects {message, datetime}
  res.render("index", { isAuth, isMember, isAdmin, messages, username });
}

function getClub(req, res) {
  if (!req.isAuthenticated()) res.status(401).redirect("/");
  res.render("club");
}

function postClub(req, res) {
    
}

module.exports = { getMessages, getClub, postClub };
