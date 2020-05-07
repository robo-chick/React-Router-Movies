import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Movie from './Movies/Movie';
import MovieList from './Movies/MovieList';
import SavedList from './Movies/SavedList';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
      .get('http://localhost:5000/api/movies')
      .then(response => {
        setMovieList(response.data);
      })
      .catch(error => {
        console.log('Server Error', error)
      });
    };
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <Router>
        <SavedList list={savedList} />
        <Switch>
          <Route exact path='/' component={MovieList} />
          <Route path='/movie/:id' render={(props) => {
            const {id} = props.match.params;
            return <Movie key={id} id={id} addToSavedList={addToSavedList} />
          }}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
