const express = require("express");
const axios = require("axios");
const router = express.Router();
const userSchema = require("../models/user.js");

//get user by ID
async function getUserData(userId) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data: ", error);
    throw error;
  }
}

router.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const userData = await getUserData(userId);
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user data" });
  }
});

router.get("/createUser/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const userData = await getUserData(userId);
    const date = new Date()
    userData.createdAt = date
    userData.updatedAt = date
    console.log( userData)

    const user = userSchema(userData);
    user
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error}), console.log('hola'));
  } catch (error) {
    res.status(500).json({ error: "Error fetching user data" });
  }
});

module.exports = router;