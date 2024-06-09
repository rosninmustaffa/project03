const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(path.join(__dirname, '..', 'users.txt'), 'utf8', (err, data) => {
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
            console.log(`User ${username} authenticated successfully`);
            res.send({ success: true });
        } else {
            console.log(`Invalid username or password for ${username}`);
            res.send({ success: false });
        }
    });
});

// Test the server
describe('POST /login', () => {
    it('should authenticate a valid user', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'validUser1', password: 'validPassword1' });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    it('should not authenticate an invalid user', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'invalidUser', password: 'wrongPassword' });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(false);
    });
});
