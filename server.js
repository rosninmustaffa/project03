/**
 * server.js.
 *
 * @author Rosnin Mustaffa
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Received login request for username: ${username}`);

    fs.readFile('users.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users.txt:', err);
            res.status(500).send({ success: false, message: 'Internal Server Error' });
            return;
        }

        const users = data.split('\n').map(line => {
            const trimmedLine = line.trim(); // Trim whitespace characters
            const [fileUsername, filePassword] = trimmedLine.split(',');
            return { username: fileUsername, password: filePassword };
        });

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            console.log('User authenticated successfully');
            res.send({ success: true });
        } else {
            console.log('Invalid username or password');
            res.send({ success: false });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
