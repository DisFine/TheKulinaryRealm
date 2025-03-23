import React, { useState, useEffect } from 'react';
import '../style.css';
import PerfectScrollbar from 'perfect-scrollbar';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  useEffect(() => {
    fetchRecipes();
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/recipes');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (recipe.ingredients && recipe.ingredients.some(ingredient =>
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  const toggleFavorite = (recipeId) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const displayRecipes = activeTab === 'favorites'
    ? filteredRecipes.filter(recipe => favorites.includes(recipe.id))
    : filteredRecipes;

  const RecipeModal = ({ recipe, onClose }) => {
    if (!recipe) return null;

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-button" onClick={onClose}>×</button>
          <div className="modal-header">
            <h2>{recipe.name}</h2>
            <div className="recipe-meta">
              <span>⏱️ Prep: {recipe.prep_time} mins</span>
              <span>⏲️ Cook: {recipe.cook_time} mins</span>
              <span>👥 Serves: {recipe.serving_min}-{recipe.serving_max}</span>
            </div>
          </div>
          <div className="modal-body">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="modal-image"
            />
            <div className="recipe-description">{recipe.description}</div>

            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients ? (
                typeof recipe.ingredients === 'string' ?
                  recipe.ingredients.split(',').map((step, index) => (
                    <li key={index}>{step.trim()}</li>
                  ))
                  : Array.isArray(recipe.ingredients) ?
                    recipe.ingredients.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))
                    : <li>{recipe.ingredients}</li>
              ) : (
                <li>No ingredients available</li>
              )}
            </ul>

            <h2>Instructions</h2>
            <ol className="instructions-list">
              {recipe.instructions ? (
                typeof recipe.instructions === 'string' ?
                  recipe.instructions.split(',').map((step, index) => (
                    <li key={index}>{step.trim()}</li>
                  ))
                  : Array.isArray(recipe.instructions) ?
                    recipe.instructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))
                    : <li>{recipe.instructions}</li>
              ) : (
                <li>No instructions available</li>
              )}
            </ol>


            <div className="recipe-footer">
              <p>Created on: {formatDate(recipe.created_at)}</p>
              <p>Chef ID: {recipe.chef_id}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Delicious Recipes</h1>
        <p>Find your next culinary adventure</p>
      </header>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search recipes by name or ingredient..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Recipes
        </button>
        <button
          className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading delicious recipes...</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {displayRecipes.length > 0 ? (
            displayRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-image-container">
                  <img src={recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'} alt={recipe.name} className="recipe-image" />
                  <button
                    className={`favorite-button ${favorites.includes(recipe.id) ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(recipe.id)}
                  >
                    {favorites.includes(recipe.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className="recipe-info">
                  <h3>{recipe.name}</h3>
                  <div className="recipe-meta">
                    <span>⏱️ {recipe.cook_time || 0} mins</span>
                    <span>⏲️ {recipe.prep_time || 0} mins</span>
                  </div>
                  <p className="recipe-description">{recipe.description}</p>
                  <button
                    className="view-recipe-button"
                    onClick={() => handleViewRecipe(recipe)}
                  >
                    View Recipe
                  </button>

                </div>
              </div>
            ))
          ) : (
            <div className="no-recipes">
              <p>No recipes found. Try a different search term.</p>
            </div>
          )}
        </div>
      )}

      <div className="categories-section">
        <h2>Browse by Category</h2>
        <div className="category-buttons">
          <button className="category-button">Breakfast</button>
          <button className="category-button">Lunch</button>
          <button className="category-button">Dinner</button>
          <button className="category-button">Desserts</button>
          <button className="category-button">Vegetarian</button>
          <button className="category-button">Quick Meals</button>
        </div>
      </div>

      {showModal && <RecipeModal recipe={selectedRecipe} onClose={closeModal} />}

      <footer className="footer">
        <p>© {new Date().getFullYear()} Recipe Finder App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
