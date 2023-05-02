const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:passwordadmin@tugas-eduwork.whlvwc1.mongodb.net/?retryWrites=true&w=majority";

(async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connecting to database: Success");
    }
    catch(error) {
        console.log("Connecting to database: Failed --> ");
    }
})();

module.exports = mongoose;