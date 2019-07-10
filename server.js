const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));