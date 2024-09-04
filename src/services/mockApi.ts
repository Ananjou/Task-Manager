import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Créer une instance d'Axios
const api = axios.create({
  baseURL: '/api',
});

// Configurer axios-mock-adapter pour simuler les réponses API
const mock = new MockAdapter(api);

// Données initiales pour les tâches simulées
let tasks = [
  { id: 1, name: 'Task 1', description: 'Description of Task 1', status: 'In Progress' },
  { id: 2, name: 'Task 2', description: 'Description of Task 2', status: 'Completed' },
  { id: 3, name: 'Task 3', description: 'Description of Task 3', status: 'Pending' },
];

// Simuler un appel GET pour récupérer les tâches
mock.onGet('/tasks').reply(200, tasks);

// Simuler un appel POST pour créer une nouvelle tâche
mock.onPost('/tasks').reply(config => {
  const newTask = JSON.parse(config.data);
  newTask.id = tasks.length + 1; // Générer un ID unique
  tasks.push(newTask);
  return [201, newTask];
});

// Simuler un appel PUT pour mettre à jour une tâche existante
mock.onPut(/\/tasks\/\d+/).reply(config => {
  const updatedTask = JSON.parse(config.data);
  tasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
  return [200, updatedTask];
});

// Simuler un appel DELETE pour supprimer une tâche
mock.onDelete(/\/tasks\/\d+/).reply(config => {
  const id = parseInt(config.url!.split('/').pop()!, 10);
  tasks = tasks.filter(task => task.id !== id);
  return [204];
});

export default api;
