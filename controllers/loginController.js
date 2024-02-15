
const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// In-memory
const users = [];

app.use(express.json());

const USERS_FILE_PATH = 'users.json';

// Function to read users from the JSON file
const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(USERS_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Function to write users to the JSON file
const writeUsersToFile = (users) => {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), 'utf8');
};

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Read users from the file
        const usersFromFile = readUsersFromFile();

        // Find user
        const findUser = usersFromFile.find((data) => email === data.email);

        if (!findUser) {
            return res.status(400).send("Wrong email or password!");
        }

        const passwordMatch = await bcrypt.compare(password, findUser.password);

        if (passwordMatch) {
            return res.status(200).send("Logged in successfully!");
        } else {
            return res.status(400).send("Wrong email or password!");
        }
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
