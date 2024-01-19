const mongoose = require('mongoose');


const setupTestDB = () => {
  
  return mongoose.connect("mongodb+srv://test123:test123@cluster0.omcfs3s.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));
};

module.exports = { setupTestDB };
