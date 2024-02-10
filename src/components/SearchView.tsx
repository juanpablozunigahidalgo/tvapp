import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

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

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
        );
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
      <div className="show-grid">
        {shows.map((show) => (
          <div key={show.id} className="show-card">
            <img src={show.image.medium} alt={show.name} />
            <h3>{show.name}</h3>
            <p>Rating: {show.rating?.average || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchView;