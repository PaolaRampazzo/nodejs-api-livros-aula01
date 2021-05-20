const express = require('express');
const app = express();

app.use(express.json());

const livros = require("./livros.json");

app.get('/livros', (request, reponse) => {
    return reponse.json( livros )
});

app.post('/livros', (request, reponse) => {
    const { titulo, autor, anoPublicacao } = request.body;
    return reponse.json( { titulo, autor, anoPublicacao } )
});

app.put('/livros/:id', (request, reponse) => {
    const parametro = request.params;
    return reponse.json( parametro )
});

app.delete('/livros/:id', (request, reponse) => {
    const { id } = request.params;
    return reponse.json( id )
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000')) 