'use client';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FavoritedAssignments = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleUnfavorite = (fileName) => {
    const updatedFavorites = favorites.filter(favorite => favorite.fileName !== fileName);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    toast.success('Successfully removed from favorites');
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="text-xl font-bold mb-4">Favorited Assignments</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index} className="flex justify-between items-center">
              <a href={`/displayFavorite?file=${favorite.fileName}`} className="text-blue-500 hover:underline">
                {favorite.name} ({favorite.fileName})
              </a>
              <button
                onClick={() => handleUnfavorite(favorite.fileName)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Unfavorite
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritedAssignments;
