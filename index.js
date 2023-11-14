const express = require('express'); //importa o express
const connectToDatabase = require("./src/database/database"); //conectando ao banco de dados
const cors = require('cors');
const app = express(); //controi um novo app
const port = 3001;

connectToDatabase();
const routes = require('./src/routes/user.router')

app.use(cors());
app.use(express.json());//Diz ao aplicativo Express para usar o middleware JSON

app.use('/users', routes)

app.get('/', (req, res) => {
    res.send('Hello world');
});
 
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

