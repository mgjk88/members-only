const pool = require("./pool");

async function getUser(username) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1 LIMIT 1;",
      [username]
    );
    if (rows.length === 0) {
        console.log("User not found");
        return null;
    }
    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function addUser(fullname, username, passwordHash) {
  try {
    await pool.query(
      "INSERT INTO users (fullname, member, admin, username, password) VALUES ($1, $2, $3, $4, $5);",
      [fullname, false, false, username, passwordHash]
    );
    console.log("user added successfully");
  } catch (error) {
    console.error(error);
    console.log("user add failed");
  }
}

async function updateUserField(username, columnName, updatedVal) {
  try {
    await pool.query("UPDATE users SET $1 = $2 WHERE username = $3;", [
      columnName,
      updatedVal,
      username,
    ]);
    console.log("user updated successfully");
  } catch (error) {
    console.error(error);
    console.log("user update failed");
  }
}

async function delUser(username) {
  try {
    await pool.query("DELETE FROM users WHERE username = $1", [username]);
    console.log("user deleted");
  } catch (error) {
    console.error(error);
    console.log("user deletion failed");
  }
}

async function getMaskedMessages(){
    try {
        const { rows } = await pool.query(`SELECT message, datetime FROM messages`);
        console.log("masked messages get");
        return rows;
    } catch (error) {
        console.error(error)
        console.log("masked messages get failed");
    }
}

async function getMessages(){
    try {
        const { rows } = await pool.query(`SELECT message, datetime, username FROM messages JOIN users ON messages.user_id = users.id`);
        console.log("messages get");
        return rows;
    } catch (error) {
        console.error(error)
        console.log("messages get failed");
    }
}

async function addMessage(username, message) {
  try {
    await pool.query(
      `INSERT INTO messages (message, datetime, user_id) 
      VALUES ($1, $2, (SELECT id FROM users WHERE username = $3 LIMIT 1));`,
      [message, Date.now() ,username]);
    console.log('message added');
  } catch (error) {
    console.error(error);
    console.log('message add failed');
  }
}

async function delMessage(username, message, datetime){
    try {
        await pool.query(`DELETE FROM messages WHERE username = $1 AND message = $2 AND datetime = $3`, [username, message, datetime]);
        console.log('message deleted');
    } catch (error) {
        console.error(error);
        console.log('message deletion failed');
    }
}

module.exports = {
  getUser,
  addUser,
  updateUserField,
  delUser,
  getMaskedMessages,
  getMessages,
  addMessage,
  delMessage
};
