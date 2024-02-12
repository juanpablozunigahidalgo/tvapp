import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Actor {
  person: { name: string; image: { medium: string } };
}

interface Show {
  id: number;
  name: string;
  image: { medium: string };
  summary: string;
  _embedded: { cast: Actor[] };
}

const MovieDetails: React.FC = () => {
  const [show, setShow] = useState<Show | null>(null); // State to store the details of the movie
  const [loading, setLoading] = useState<boolean>(true); // State to track loading state
  const { id } = useParams(); // Get the movie ID from URL parameter
  const navigate = useNavigate(); // Hook for navigation

  // Function to fetch details of the specific movie based on its ID
  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        // Fetch movie details from the TVMaze API
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}?embed=cast`);
        console.log('Movie Details Response:', response.data); // Log the response data
        setShow(response.data); // Set the fetched movie details to state
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching show details:', error); // Log any errors that occur during API request
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchShowDetails(); // Call the function to fetch movie details when component mounts or ID changes
  }, [id]); // Dependency array with ID to re-fetch movie details when ID changes

  // Function to handle navigation back to the SearchView page
  const handleGoBack = () => {
    navigate('/tvapp'); // Navigate to the root path
  };

  // Render loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if show is not available
  if (!show) {
    return <div>No information available.</div>;
  }

  return (
    <div className="movie-details">
      <> {/* React fragment to wrap multiple elements */}
        {show.image && show.image.medium && (
          <img src={show.image.medium} alt={show.name} />
        )}
        {show.name && <h2>{show.name}</h2>}
        {show.summary ? <p>{show.summary}</p> : <p>No description available.</p>}
        <h3>Cast</h3>
        <div className="cast-list">
          {/* Map through the cast of the movie and display their information */}
          {show._embedded.cast.map((actor, index) => (
            <div key={index} className="actor-card">
              {actor.person.image && actor.person.image.medium && (
                <img src={actor.person.image.medium} alt={actor.person.name} />
              )}
              {actor.person.name && <p>{actor.person.name}</p>}
            </div>
          ))}
        </div>
        <button onClick={handleGoBack}>Go Back to Search</button>
      </>
    </div>
  );
};

export default MovieDetails;