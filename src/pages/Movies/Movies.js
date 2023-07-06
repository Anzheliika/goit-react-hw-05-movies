import { searchMovies } from 'services/api';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Input, Form, Button } from './Movies.styled';
import { Name, MoviesItem, MoviesList } from 'pages/Home/Home.styled';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('movieName');
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  const defaultPicture =
    'https://eod-grss-ieee.com/uploads/science/1655561736_noimg_-_Copy.png';

  const updateQueryString = e => {
    setName(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '') {
      toast('Please enter a movie title');
      return;
    }

    setSearchParams(movieName !== '' ? { movieName: name } : {});

    e.target.reset();
  };

  useEffect(() => {
    if (movieName) {
      searchMovies(movieName).then(setMovies);
    }
  }, [movieName]);

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: '#F9CD5B',
            color: '#000',
            fontSize: '20px',
          },
        }}
      />

      <Link
        style={{
          fontSize: '26px',
          fontWeight: 600,
        }}
        to={backLinkLocationRef.current}
      >
        Go back
      </Link>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="movieName"
          onChange={updateQueryString}
          autoComplete="off"
          autoFocus
        />
        <Button type="submit">Search</Button>
      </Form>
      <MoviesList>
        {movies.map(({ id, title, poster_path }) => (
          <MoviesItem key={id}>
            <Link to={`${id}`} state={{ from: location }}>
              {poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  width="250"
                />
              ) : (
                <img
                  src={defaultPicture}
                  alt={title}
                  width="250"
                  height="375"
                />
              )}
              <Name>{title}</Name>
            </Link>
          </MoviesItem>
        ))}
      </MoviesList>
    </>
  );
};

export default Movies;
