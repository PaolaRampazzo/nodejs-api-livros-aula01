const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());

const livros = require("./livros.json");

app.get('/', (request, reponse) => {

    const { titulo } = request.query;

    const resultado = titulo
        ? livros.filter( livro => livro.titulo.includes(titulo) )
        : livros

    return reponse.json(resultado)
});

app.post('/', (request, reponse) => {

    const { titulo, descricao, autor, anoPublicacao } = request.body;
    
    const livro = { id: uuid(), titulo, descricao, autor, anoPublicacao };

    livros.push(livro)

    return reponse.json( livro )
});

app.put('/livros/', (request, reponse) => {

    const { id, titulo, descricao, autor, anoPublicacao } = request.body;

    const indiceLivro = livros.findIndex( livro => livro.id === id );

    if ( indiceLivro < 0 ) {
        return response.status(400).json({ error: 'Livro não encontrado.' })
    }

    const livro = {
        id,
        titulo,
        descricao,
        autor,
        anoPublicacao
    }

    livros[indiceLivro] = livro;

    return reponse.json(livro);
});

app.delete('/livros/:id', (request, reponse) => {

    const { id } = request.params;

    const indiceLivro = livros.findIndex( livro => livro.id === Number(id) );

    if( indiceLivro < 0 ) {
        return response.status(400).json({ error: 'Livro não encontrado.' });
    }

    livros.splice(indiceLivro, 1);

    return reponse.status(204).send();
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000')) 