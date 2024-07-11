const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

// Middleware Setup
app.use(express.json());
app.use(cors())

// Rutas
const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`La tarea está funcionando en http://localhost:${port}`)
});