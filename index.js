//import axios from 'axios';

const axios = require('axios');

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

const userId = 1;
getUserData(userId)
  .then((userData) => {
    console.log("User Data: ", userData);
  })
  .catch((error) => {
    console.error("Error: ", error);
  });