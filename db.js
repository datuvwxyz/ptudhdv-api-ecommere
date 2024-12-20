const mongoose = require('mongoose');

// URL kết nối tới MongoDB (Local hoặc Cloud)
const uri = 'mongodb://localhost:27017/apiEcommere'; // Thay 'mydatabase' bằng tên cơ sở dữ liệu của bạn

// Tùy chọn kết nối
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Kết nối đến MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(uri, options);
        console.log('Kết nối MongoDB thành công!');
    } catch (error) {
        console.error('Kết nối MongoDB thất bại:', error.message);
        process.exit(1); // Thoát ứng dụng nếu không thể kết nối
    }
};

module.exports = connectDB;
