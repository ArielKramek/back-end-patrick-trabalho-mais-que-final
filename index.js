const express = require('express');
const app = express();

app.use(express.json());


const livros = [];
let idAtual = 1;


const db = {
  query: async (sql, params) => {
    console.log('Query:', sql, params);

    
    if (sql.startsWith('INSERT')) {
      const novoLivro = {
        id: idAtual++,
        titulo: params[0],
        autor: params[1]
      };
      livros.push(novoLivro);
      return { insertId: novoLivro.id };
    }

    
    if (sql.startsWith('SELECT')) {
      return [livros];
    }

    return [];
  }
};


app.post('/livros', async (req, res) => {
  try {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) {
      return res.status(400).json({
        erro: 'Os campos "titulo" e "autor" são obrigatórios'
      });
    }

    await db.query(
      'INSERT INTO livros (titulo, autor) VALUES (?, ?)',
      [titulo, autor]
    );

    return res.status(201).json({
      mensagem: 'Livro cadastrado com sucesso',
      titulo,
      autor
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao cadastrar o livro'
    });
  }
});


app.get('/livros', async (req, res) => {
  try {
    const [resultado] = await db.query('SELECT * FROM livros');
    return res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao buscar os livros'
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});