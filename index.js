const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

// Generate the filename using date-fns format
const generateFilename = () => {
    return format(new Date(), "ddMMyyyy_HH-mm-ss");
};

app.get('/', (req, res) => {
    const filename = generateFilename();
    // Write the filename as content to the file
    fs.writeFile(path.join(__dirname, `${filename}.txt`), filename, (err) => {
        if (err) throw err;
        console.log("Write completed");
        res.send('File created successfully!');
    });
});

app.get('/files', (req, res) => {
    // Read all files in the directory
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Filter out only text files
        const textFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');

        res.json(textFiles);
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`This server is running on the port: ${PORT}`);
});
