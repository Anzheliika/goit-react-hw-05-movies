import { getTrendMovies } from 'services/api';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeTitle,
  Name,
  TrendMoviesItem,
  TrendMoviesList,
} from './Home.styled';


const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrendMovies().then(setTrendMovies);
  }, []);

  return (
    <>
      <HomeTitle>Trending today</HomeTitle>
      <TrendMoviesList>
        {trendMovies.map(({ id, title, poster_path }) => (
          <TrendMoviesItem key={id}>
            <Link to={`movies/${id}`} state={{ from: location }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
                width="250"
              />
              <Name>{title}</Name>
            </Link>
          </TrendMoviesItem>
        ))}
      </TrendMoviesList>
    </>
  );
};

export default Home;
