// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import TaskTable from './TaskTable';
// import api from '../services/mockApi';

// // Mock de l'API
// jest.mock('../services/mockApi');

// const mockTasks = [
//   { id: 1, name: 'Task 1', description: 'Description 1', status: 'In Progress' },
//   { id: 2, name: 'Task 2', description: 'Description 2', status: 'Completed' },
// ];

// describe('TaskTable', () => {
//   beforeEach(() => {
//     (api.get as jest.Mock).mockResolvedValue({ data: mockTasks });
//   });

//   test('renders TaskTable component', async () => {
//     render(<TaskTable />);
//     // Vérifiez que le titre est présent
//     expect(screen.getByText('Task Manager')).toBeInTheDocument();
    
//     // Vérifiez que les tâches sont affichées
//     expect(await screen.findByText('Task 1')).toBeInTheDocument();
//     expect(await screen.findByText('Task 2')).toBeInTheDocument();
//   });

//   test('opens modal on "Create Task" button click', () => {
//     render(<TaskTable />);
//     const createButton = screen.getByRole('button', { name: /Create Task/i });
//     fireEvent.click(createButton);
//     expect(screen.getByText(/Create Task/i)).toBeVisible();
//   });

//   // Ajoutez des tests pour d'autres fonctionnalités si nécessaire
// });
