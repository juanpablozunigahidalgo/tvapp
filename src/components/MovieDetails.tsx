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
  const [show, setShow] = useState<Show | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}?embed=cast`);
        setShow(response.data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="movie-details">
      {show && (
        <>
          <img src={show.image.medium} alt={show.name} />
          <h2>{show.name}</h2>
          <p>{show.summary}</p>
          <h3>Cast</h3>
          <div className="cast-list">
            {show._embedded.cast.map((actor, index) => (
              <div key={index} className="actor-card">
                <img src={actor.person.image.medium} alt={actor.person.name} />
                <p>{actor.person.name}</p>
              </div>
            ))}
          </div>
          <button onClick={handleGoBack}>Go Back to Search</button>
        </>
      )}
    </div>
  );
};

export default MovieDetails;