const mongoose = require('mongoose');

const connectDB = () => {
    const conn = mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    conn.then(() => {
        console.log('DB connected');
    }, error => {
        console.log(error);
        process.exit(1);
    })
}

module.exports = connectDB;