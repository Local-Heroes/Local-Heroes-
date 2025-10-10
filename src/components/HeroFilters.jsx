// components/HeroFilters.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters, filterHeroes } from '../store/slices/heroesSlice';


const HeroFilters = () => {
  const dispatch = useDispatch();
  const { filters, heroes } = useSelector(state => state.heroes);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique locations from heroes
  const allLocations = [...new Set(heroes.map(hero => hero.location))];
  const popularTags = ['software engineer', 'Youth Development', 'Social Services', 'Education', 'Healthcare'];

  const handleSearchChange = (value) => {
    dispatch(setFilters({ search: value }));
    dispatch(filterHeroes());
  };

  const handleTagToggle = (tag) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    dispatch(setFilters({ tags: newTags }));
    dispatch(filterHeroes());
  };

  const handleLocationChange = (location) => {
    dispatch(setFilters({ location }));
    dispatch(filterHeroes());
  };

  const handleImpactAreaChange = (area) => {
    dispatch(setFilters({ impactArea: area }));
    dispatch(filterHeroes());
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(filterHeroes());
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search heroes by name, story, or impact area..."
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span>Show Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {activeFiltersCount > 0 && (
          <button
            onClick={handleClearFilters}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
          {/* Popular Tags */}
          <div>
            <h4 className="font-semibold mb-3">Popular Tags</h4>
            <div className="space-y-2">
              {popularTags.map(tag => (
                <label key={tag} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.tags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{tag}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h4 className="font-semibold mb-3">Location</h4>
            <select
              value={filters.location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {allLocations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Impact Area */}
          <div>
            <h4 className="font-semibold mb-3">Impact Area</h4>
            <select
              value={filters.impactArea}
              onChange={(e) => handleImpactAreaChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Areas</option>
              {popularTags.map(area => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroFilters;