const mongoose = require("mongoose");

function connectToDatabase() {
    mongoose.connect("mongodb://127.0.0.1:27017/aulas", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MONGO DB CONECTADO");
    }).catch((err) => {
        console.log(`Erro na conexão com o banco: ${err}`);
    });
}

module.exports = connectToDatabase