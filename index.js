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

app.get("/teste-token", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: "O token não foi informado" });
    }
    
    const [scheme, token] = authHeader.split(" ");
    
    if (!scheme || !/^Bearer$/i.test(scheme) || !token) {
        return res.status(401).send({ message: "O token está malformatado" });
    }
    
    jwt.verify(token, segredo, async (err, decoder) => {
        if (err) {
            return res.status(401).send({ message: "Falha ao verificar o token" });
        }
    
       res.send(decoder);
    });
    
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

