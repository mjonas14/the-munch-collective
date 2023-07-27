const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 5174;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`App running on http://localhost:${PORT}`);
});
