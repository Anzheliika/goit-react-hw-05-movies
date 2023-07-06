import { getTrendMovies } from 'services/api';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeTitle, Name, MoviesItem, MoviesList } from './Home.styled';


const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrendMovies().then(setTrendMovies);
  }, []);

  return (
    <>
      <HomeTitle>Trending today</HomeTitle>
      <MoviesList>
        {trendMovies.map(({ id, title, poster_path }) => (
          <MoviesItem key={id}>
            <Link to={`movies/${id}`} state={{ from: location }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
                width="250"
              />
              <Name>{title}</Name>
            </Link>
          </MoviesItem>
        ))}
      </MoviesList>
    </>
  );
};

export default Home;
