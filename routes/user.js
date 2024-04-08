const express = require("express");
const axios = require("axios");
const router = express.Router();
const userSchema = require("../models/user.js");

//get user by ID from API
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
//get user by ID from mongodb
async function getUserById(userId) {
  try {
    const userExist = userSchema.find({ id: userId });
    return userExist;
  } catch (err) {
    console.log(err);
  }
}

async function createUser(userData) {
  try {
    const date = new Date();
    userData.createdAt = date;
    userData.updatedAt = date;
    const user = userSchema(userData);
    user.save();
    return user;
  } catch (err) {
    console.log(err);
  }
}

//When trying to create a user, if the user exist then this method will be called and will updated the 'updatedAt' attribute from the user.
async function updateUser(userId){
  try{
    const date = new Date()
    const updatedAt = date
    const userUpdated =  userSchema.updateOne({id: userId}, { $set: {updatedAt} })
    return userUpdated
  }catch(err){console.log(err);}
}

//Remove a user from MongoDB
async function removeUser(userId){
  try{
   const removedUser = userSchema.deleteOne({id: userId})
   return removedUser
  }catch(err){console.log(err);}
}

//get user from given API
router.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const userData = await getUserData(userId);
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user data" });
  }
});

//get user by ID from mongodb
router.get("/getUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userExist = await getUserById(userId);
    res.json(userExist);
  } catch (err) {
    console.log(err);
  }
});

router.get('/updateUser')

//Get user from https://jsonplaceholder.typicode.com/users/ and then post it on the DB
router.get("/createUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userExist = await getUserById(userId)
    console.log(userExist.length)
    if(userExist.length === 1){
      const userUpdated = await updateUser(userId)
      res.json(userUpdated)
    }else{
      const userData = await getUserData(userId);
      const newUser = await createUser(userData)
      res.json(newUser)
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching user data" });
  }
});

router.delete('/removeUser/:userId', async (req, res) => {
    try{
      const userId = req.params.userId
      const removedUser = await removeUser(userId)
      res.json(removedUser)
    }catch(err){err}
})

module.exports = router;
