import express from 'express';
import routes from './routes.js';
import db from './src/db.js';
// import dotenv from 'dotenv';

// dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);
db.sync();

app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));
