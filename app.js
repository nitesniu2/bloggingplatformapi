const https = require("https");

const express = require('express');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');

const app = express();
app.use(bodyParser.json());
app.use('/posts', postsRouter);

/*app.post('/posts',(req, res) =>{
    console.log('Received data:', req.body);
    res.status(201).json(req.body);
});*/

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
