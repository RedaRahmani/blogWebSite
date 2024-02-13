// app.js
const express = require('express');
const app = express();
const port = 3000;
const postRoutes = require('./routes/postRoutes');

app.use(express.json()); // Enable JSON parsing
app.use('/api', postRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
