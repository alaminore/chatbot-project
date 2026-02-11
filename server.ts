import 'dotenv/config';
import express from 'express';
import { handleChat } from './src/routes/chat.js';
import { renderHome } from './src/routes/home.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.static('public'));

app.get('/', renderHome);
app.post('/chat', handleChat);

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
