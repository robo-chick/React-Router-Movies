import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import MovieCard from './MovieCard';

const MovieList = props => {
  const [movies, setMovies] = useState([])
  
  useEffect(() => {
    const getMovies = () => {
      axios
      .get('http://localhost:5000/api/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.log('Server Error', error);
      })
    }
    getMovies();
  }, []);

  return (
    <div className="movie-list">
      {movies.map(movie => (
         <MovieDetails key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

function MovieDetails({ movie }) {
  const { title, director, metascore, stars, id } = movie;
  return (
    <Link to={`/movie/${id}`}>
      <MovieCard
        key={id}
        title={title}
        director={director}
        metascore={metascore}
        stars={stars}
        />
    </Link>
  );
}

export default MovieList;
