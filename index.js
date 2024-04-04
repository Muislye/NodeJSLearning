
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

async function getUserData(userId) {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data: ", error);
    throw error;
  }
}

app.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const userData = await getUserData(userId);
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});