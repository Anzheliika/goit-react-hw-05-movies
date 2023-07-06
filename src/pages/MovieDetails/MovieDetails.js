import {
  Link,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useState, useEffect, useRef, Suspense } from 'react';
import { getMovieDetails } from 'services/api';
import {
  AddInfo,
  AddInfoItem,
  Description,
  Details,
  MovieInfo,
  Title,
} from './MovieDetails.styled';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  const [movieInfo, getMovieInfo] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(getMovieInfo);
  }, [movieId]);

  if (!movieInfo) {
    return null;
  }
  const { title, poster_path, overview, genres } = movieInfo;
  const genresList = genres.map(genre => genre.name).join(', ');

  return (
    <>
      <Link
        style={{
          fontSize: '26px',
          fontWeight: 600,
        }}
        to={backLinkLocationRef.current}
      >
        Go back
      </Link>
      <MovieInfo>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          width="430"
        />
        <Details>
          <h2>{title}</h2>
          <Title>Overview:</Title>
          <Description>{overview}</Description>
          <Title>Genres:</Title>
          <Description>{genresList}</Description>
        </Details>
      </MovieInfo>

      <AddInfo>
        <Title>Additional information</Title>
        <ul>
          <AddInfoItem>
            <Link to="cast">Cast</Link>
          </AddInfoItem>
          <AddInfoItem>
            <Link to="reviews">Reviews</Link>
          </AddInfoItem>
        </ul>
      </AddInfo>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;

