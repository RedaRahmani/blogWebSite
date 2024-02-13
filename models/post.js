const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');

const dataPath = '../blogs.json'

const readData = () => {
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
    };
const getAllPosts = () => {
    return readData();
    };

const writeData = (data) => {
    fs.writeFileSync(dataPath, stringify(data , null , 2))
}

module.exports ={
    readData,
    getAllPosts,
    writeData
}

