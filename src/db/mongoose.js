const mongoose = require('mongoose');

const connectionUrl = 'mongodb://127.0.0.1:27017/TA-allocation';

// const connectionURL
mongoose.connect(connectionUrl, {
    useNewUrlParser : true
});