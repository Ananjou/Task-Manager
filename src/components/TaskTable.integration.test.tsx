// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import TaskTable from './TaskTable';
// import api from '../services/mockApi';

// // Mock de l'API
// jest.mock('../services/mockApi');

// const mockTasks = [
//   { id: 1, name: 'Task 1', description: 'Description 1', status: 'In Progress' },
// ];

// describe('TaskTable Integration Tests', () => {
//   beforeEach(() => {
//     (api.get as jest.Mock).mockResolvedValue({ data: mockTasks });
//     (api.post as jest.Mock).mockResolvedValue({
//       data: { id: 2, name: 'New Task', description: 'New Description', status: 'Pending' }
//     });
//     (api.delete as jest.Mock).mockResolvedValue({});
//   });

//   test('creates a new task', async () => {
//     render(<TaskTable />);
//     const createButton = screen.getByRole('button', { name: /Create Task/i });
//     fireEvent.click(createButton);

//     fireEvent.change(screen.getByPlaceholderText(/Enter task name/i), { target: { value: 'New Task' } });
//     fireEvent.change(screen.getByPlaceholderText(/Enter task description/i), { target: { value: 'New Description' } });
//     fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Pending' } });

//     fireEvent.click(screen.getByRole('button', { name: /Save/i }));

//     await waitFor(() => expect(screen.getByText('New Task')).toBeInTheDocument());
//   });

//   test('deletes a task', async () => {
//     render(<TaskTable />);
//     // Simuler un clic sur le bouton de suppression
//     fireEvent.click(screen.getAllByRole('button', { name: /pi pi-trash/i })[0]);

//     await waitFor(() => expect(screen.queryByText('Task 1')).not.toBeInTheDocument());
//   });
// });
// function beforeEach(arg0: () => void) {
//     throw new Error('Function not implemented.');
// }

// function expect(arg0: any) {
//     throw new Error('Function not implemented.');
// }

