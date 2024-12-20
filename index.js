// Import Express
const express = require('express');
const app = express();
const connectDB = require('./db');
const router = require('./route');
// Cấu hình cổng chạy server
const port = 3000;


// Kết nối cơ sở dữ liệu
connectDB();

app.use(router);

// Bắt đầu server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
