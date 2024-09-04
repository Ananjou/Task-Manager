import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

import { Button } from 'primereact/button';
        

// Définition du composant Form
const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false); // État pour gérer la redirection
  const navigate = useNavigate(); // Initialiser le hook de navigation

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Empêche le rafraîchissement de la page
    console.log('Email:', email);
    console.log('Password:', password);
    setEmail('');
    setPassword('');

    // Définir l'état à true pour déclencher la redirection
    setShouldRedirect(true);
  };

  // Utilisation de useEffect pour gérer la redirection
  useEffect(() => {
    if (shouldRedirect) {
      navigate('/task'); // Rediriger vers la page Tasks
    }
  }, [shouldRedirect, navigate]);

  return (
    <div className="flex items-center justify-center min-h-fit bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="bg-teal-200 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>

        <div className="mb-6 text-left">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6 text-left">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

     
        <Button label="Submit" icon="pi pi-check" iconPos="right" severity="success" raised  className='bg-green-300'/>
      </form>
    </div>
  );
};

export default Form;
