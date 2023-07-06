import { Description } from 'pages/MovieDetails/MovieDetails.styled';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from 'services/api';
import { CastItem, CastList } from './Cast.styled';

const Cast = () => {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();

  const defaultPhoto =
    'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png';

  useEffect(() => {
    getMovieCast(movieId).then(setActors);
  }, [movieId]);

  return (
    <CastList>
      {actors.cast &&
        actors.cast.map(({ character, name, profile_path, cast_id }) => (
          <CastItem key={cast_id}>
            {profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                alt={name}
                width="250"
              />
            ) : (
              <img src={defaultPhoto} alt={name} width="250" height='360'/>
            )}
            <Description>{name}</Description>
            <Description>Character: {character}</Description>
          </CastItem>
        ))}
    </CastList>
  );
};

export default Cast;

