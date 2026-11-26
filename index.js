const express = require('express');
const db = require('./bd');

const app = express();
app.use(express.json());


app.post('/livros', async (req, res) => {
  const { titulo, autor } = req.body;

  if (!titulo || !autor) {
    return res.status(400).json({ erro: 'Informe titulo e autor.' });
  }

  try {
    const [resultado] = await db.query(
      'INSERT INTO livros (titulo, autor) VALUES (?, ?)',
      [titulo, autor]
    );

    return res.status(201).json({ id: resultado.insertId, titulo, autor });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao cadastrar o livro.' });
  }
});


app.get('/livros', async (req, res) => {
  try {
    const [livros] = await db.query('SELECT * FROM livros');
    return res.status(200).json(livros);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao buscar os livros.' });
  }
});


app.get('/livros/:id', async (req, res) => {
  try {
    const [livros] = await db.query('SELECT * FROM livros WHERE id = ?', [req.params.id]);

    if (livros.length === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado.' });
    }

    return res.status(200).json(livros[0]);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao buscar o livro.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
