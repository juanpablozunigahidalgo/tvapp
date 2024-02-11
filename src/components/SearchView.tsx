import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './SearchView.css'; // Import the CSS file

interface Show {
  id: number;
  name: string;
  image: { medium: string };
  rating: { average: number };
}

const SearchView: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  // Helper function to generate stars based on rating
  const generateStars = (rating: number): string => {
    const roundedRating = Math.floor(rating);
    return '★'.repeat(roundedRating);
  };

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
        );
        console.log('JSON Response:', response.data); // Log the JSON response
        setShows(response.data.map((result: any) => result.show));
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, [query]);

  return (
    <div className="search-view">
      <h2>Search Results</h2>
      <div className="show-grid-wrapper">
        <div className="show-grid">
          {shows.map((show) => (
            <div key={show.id} className="show-card">
              <img src={show.image.medium} alt={show.name} />
              <h3>{show.name}</h3>
              <p className="rating-stars">{show.rating ? generateStars(show.rating.average) : 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchView;
