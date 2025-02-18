const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();

// Lista de origens permitidas
const allowedOrigins = [
  'http://localhost:3000',
  'https://gerenciamento-de-tarefas-seven.vercel.app'
];

// Headers padrão para todas as requisições
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Configuração CORS atualizada
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Array para armazenar as tarefas
let tasks = [];

// Rota GET para listar todas as tarefas
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Rota POST para criar uma nova tarefa
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'O título da tarefa é obrigatório' });
  }

  const newTask = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Rota PUT para atualizar uma tarefa existente
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    completed
  };

  res.json(tasks[taskIndex]);
});

// Rota DELETE para remover uma tarefa
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();
});

// Rota de teste para verificar se o servidor está funcionando
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Configuração da porta e inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
