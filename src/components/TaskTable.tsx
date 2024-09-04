import React, { useState, useEffect } from 'react';
import api from '../services/mockApi'; // Importez l'API simulée
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { DropdownChangeEvent } from 'primereact/dropdown';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

// Define an interface for the task data
interface Task {
  id: number;
  name: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'Pending';
}

const TaskTable = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDialog, setTaskDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskForm, setTaskForm] = useState<{ name: string; description: string; status: Task['status'] }>({
    name: '',
    description: '',
    status: 'Pending',
  });
  const [isNewUser, setIsNewUser] = useState(true); // Initialisez à true pour simuler un nouvel utilisateur

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      // Si aucune tâche n'est retournée, on suppose que c'est un nouvel utilisateur
      if (response.data.length === 0) {
        setIsNewUser(true);
      } else {
        setIsNewUser(false);
        setTasks(response.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Function to open the modal for creating a new task
  const openNewTaskModal = () => {
    setCurrentTask(null);
    setTaskForm({ name: '', description: '', status: 'Pending' });
    setTaskDialog(true);
  };

  // Function to open the modal for editing an existing task
  const openEditTaskModal = (task: Task) => {
    setCurrentTask(task);
    setTaskForm({ name: task.name, description: task.description, status: task.status });
    setTaskDialog(true);
  };

  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  // Function to handle dropdown changes specifically
  const handleStatusChange = (e: DropdownChangeEvent) => {
    setTaskForm({ ...taskForm, status: e.value as Task['status'] });
  };

  // Function to handle task creation or modification
  const saveTask = async () => {
    try {
      if (currentTask) {
        // Update task
        const updatedTask = { ...currentTask, ...taskForm };
        await api.put(`/tasks/${updatedTask.id}`, updatedTask);
        setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      } else {
        // Create task
        const newTask = { name: taskForm.name, description: taskForm.description, status: taskForm.status };
        const response = await api.post('/tasks', newTask);
        setTasks([...tasks, response.data]);
        setIsNewUser(false); // L'utilisateur n'est plus nouveau après la création de la première tâche
      }
      setTaskDialog(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  // Function to handle task deletion
  const handleDelete = async (task: Task) => {
    try {
      await api.delete(`/tasks/${task.id}`);
      setTasks(tasks.filter(t => t.id !== task.id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Render the status column with styled badges
  const statusBodyTemplate = (rowData: Task) => {
    const statusColors: Record<Task['status'], string> = {
      'In Progress': 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
    };

    return <Tag value={rowData.status} className={`px-2 py-1 rounded-full ${statusColors[rowData.status]}`} />;
  };

  // Render the operations column with buttons for editing and deleting tasks
  const operationsBodyTemplate = (rowData: Task) => {
    return (
      <div className="flex space-x-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-button-outlined"
          onClick={() => openEditTaskModal(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-outlined"
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Task Manager</h2>
          <Button label="Create Task" icon="pi pi-plus" className="p-button-success" onClick={openNewTaskModal} />
        </div>

        {/* Affiche un message pour le nouvel utilisateur s'il n'y a pas de tâches */}
        {isNewUser ? (
          <div className="text-center text-gray-500">
            <p>Welcome! It looks like you haven't created any tasks yet.</p>
            <p>Click the "Create Task" button to add your first task.</p>
          </div>
        ) : (
          <DataTable value={tasks} responsiveLayout="scroll" className="p-datatable-striped">
            <Column field="name" header="Task name" sortable />
            <Column field="description" header="Description" />
            <Column field="status" header="Status" body={statusBodyTemplate} sortable />
            <Column body={operationsBodyTemplate} />
          </DataTable>
        )}

        {/* Modal for creating/editing tasks */}
        <Dialog
          visible={taskDialog}
          onHide={() => setTaskDialog(false)}
          header={currentTask ? 'Edit Task' : 'Create Task'}
          footer={
            <div>
              <Button label="Cancel" icon="pi pi-times" onClick={() => setTaskDialog(false)} className="p-button-text" />
              <Button label="Save" icon="pi pi-check" onClick={saveTask} className="p-button-success" />
            </div>
          }
        >
          <div className="p-fluid">
            <div className="field mb-4">
              <label htmlFor="name">Task Name</label>
              <InputText
                id="name"
                name="name"
                value={taskForm.name}
                onChange={handleInputChange}
                placeholder="Enter task name"
              />
            </div>
            <div className="field mb-4">
              <label htmlFor="description">Description</label>
              <InputText
                id="description"
                name="description"
                value={taskForm.description}
                onChange={handleInputChange}
                placeholder="Enter task description"
              />
            </div>
            <div className="field">
              <label htmlFor="status">Status</label>
              <Dropdown
                id="status"
                name="status"
                value={taskForm.status}
                options={[
                  { label: 'In Progress', value: 'In Progress' },
                  { label: 'Completed', value: 'Completed' },
                  { label: 'Pending', value: 'Pending' },
                ]}
                onChange={handleStatusChange}
                placeholder="Select status"
              />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default TaskTable;
