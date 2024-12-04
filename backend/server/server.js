const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.get('/input/:day', (req, res) => {
    const sessionId = req.cookies.session;

    const url = `https://adventofcode.com/2024/day/${req.params.day}/input`;
    const options = {
        headers: {
            Cookie: `session=${sessionId}`,
        },
    };

    fetch(url, options)
        .then(response => response.text())
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Failed to retrieve input');
        });
});

const port = process.env.PORT || 3003; // Use environment variable or default port

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});