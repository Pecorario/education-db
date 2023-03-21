import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import db from './src/db.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

db.sync()
  .then(() => console.log('\n\nTabelas criadas com sucesso.'))
  .catch(err => console.error('\n\nErro ao criar tabelas:', err));

app.listen(3333, () => console.log('\n\nServidor iniciado na porta 3333'));
