const express = require('express');
const app = express();
const PORT = 3000;

// Middleware để xử lý JSON
app.use(express.json());

// Route đơn giản
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Lắng nghe cổng
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
