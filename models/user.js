const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    street: {
      type: String,
    },
    suite: {
      type: String,
    },
    city: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    geo: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
  },
  phone: {
    type: Number,
    unique: true,
  },
  website: {
    type: String,
  },
  company: {
    name: {
      type: String,
    },
    catchPhrase: {
      type: String,
    },
    bs: {
      type: String,
    },
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
});

module.exports = mongoose.model('user', UserScheme)
