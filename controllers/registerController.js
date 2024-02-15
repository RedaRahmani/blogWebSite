/*
const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

const app = express();
app.use(express.json());

const USERS_FILE_PATH = 'users.json';

// Endpoint pour l'inscription

app.post('/register', async (req, res) => {
    try {
        const { email, password, firstname, lastname, Gender } = req.body;

        // Log pour vérifier les données reçues dans la requête
        console.log('Request Body:', req.body);

        // Lire les utilisateurs depuis le fichier
        let users = await readUsersFromFile(USERS_FILE_PATH);

        // Vérifier si l'email existe déjà
        const findUser = users.find((data) => email === data.email);
        if (findUser) {
            return res.status(400).send("Email already exists!");
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Génération d'un ID avec uuid
        const userId = uuidv4();

        // Ajout de l'utilisateur à la liste
        const newUser = { 
            id: userId, 
            email, 
            password: hashedPassword, 
            firstname, 
            lastname, 
            gender: Gender 
        };
        users.push(newUser);

        // Écrire les utilisateurs mis à jour dans le fichier
        await writeUsersToFile(users);

        // Réponse avec l'ID généré
        res.status(201).json({ message: "Registered successfully!", userId });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

/*
app.post('/register', async (req, res) => {
    try {
        const { email, password, firstname, lastname, Gender } = req.body;

        // Lire les utilisateurs depuis le fichier
        let users = await readUsersFromFile(USERS_FILE_PATH);

        // Vérifier si l'email existe déjà
        const findUser = users.find((data) => email === data.email);
        if (findUser) {
            return res.status(400).send("Email already exists!");
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Génération d'un ID avec uuid
        const userId = uuidv4();

        // Ajout de l'utilisateur à la liste
        const newUser = { 
            id: userId, 
            email, 
            password: hashedPassword, 
            firstname, 
            lastname, 
            gender: Gender 
        };
        
        users.push(newUser);

        // Écrire les utilisateurs mis à jour dans le fichier
        await writeUsersToFile(users);

        // Réponse avec l'ID généré
        res.status(201).json({ message: "Registered successfully!", userId });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});
*/
/*
// Fonction pour lire les utilisateurs depuis le fichier
async function readUsersFromFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data) || [];
    } catch (error) {
        return [];
    }
}

// Fonction pour écrire les utilisateurs dans le fichier
async function writeUsersToFile(users) {
    const data = JSON.stringify(users, null, 2);
    await fs.writeFile(USERS_FILE_PATH, data, 'utf8');
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
*/

const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

const app = express();
app.use(express.json());

const USERS_FILE_PATH = 'users.json';

// Endpoint pour l'inscription
app.post('/register', async (req, res) => {
    try {
        const { email, password, firstname, lastname, Gender } = req.body;

        // Lire les utilisateurs depuis le fichier
        let users = await readUsersFromFile(USERS_FILE_PATH);

        // Vérifier si l'email existe déjà
        const findUser = users.find((data) => email === data.email);
        if (findUser) {
            return res.status(400).send("Email already exists!");
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Génération d'un ID avec uuid
        const userId = uuidv4();

        // Ajout de l'utilisateur à la liste
        const newUser = {
            id: userId,
            email,
            password: hashedPassword,
            firstname,
            lastname,
            gender: Gender
        };

        // Assurer que les champs firstname, lastname, et gender existent pour tous les utilisateurs
        users = users.map(user => ({
            ...user,
            firstname: user.firstname || '',
            lastname: user.lastname || '',
            gender: user.gender || ''
        }));

        users.push(newUser);

        // Écrire les utilisateurs mis à jour dans le fichier
        await writeUsersToFile(users);

        // Réponse avec l'ID généré
        res.status(201).json({ message: "Registered successfully!", userId });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// Fonction pour lire les utilisateurs depuis le fichier
async function readUsersFromFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data) || [];
    } catch (error) {
        return [];
    }
}

// Fonction pour écrire les utilisateurs dans le fichier
async function writeUsersToFile(users) {
    const data = JSON.stringify(users, null, 2);
    await fs.writeFile(USERS_FILE_PATH, data, 'utf8');
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

