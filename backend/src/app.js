import { fileURLToPath } from "url";
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import pages from './routes/pages.js';
import authRoutes from './routes/authRoutes.js';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// console.log(__dirname);

const publicDirectory = path.join(__dirname, '../../frontend/public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// const viewPath = path.join('../../frontend/views');
const viewPath = path.join(__dirname, '../../frontend/views');
app.set('views', viewPath);
app.set('view engine', 'hbs');


app.use('/api', userRoutes);
// app.use('/auth', require('./routes/auth'));

// Define Routes
app.use('/', pages);

app.use('/api/auth', authRoutes);

// app.get('/', (req, res) => {
//   // res.send("<h1>Hello Page</h1>");
//   res.render("../../frontend/views/index");
// });

// app.get('/register', (req, res) => {
//   res.render("../../frontend/views/register");
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;