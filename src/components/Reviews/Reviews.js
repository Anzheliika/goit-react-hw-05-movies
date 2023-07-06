import { Description } from 'pages/MovieDetails/MovieDetails.styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'services/api';
import { Author, ReviewItem } from './Reviews.styled';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  if (reviews.length === 0) {
    return <h2>There is no reviews</h2>;
  } else {
    return (
        <ul>
          {reviews &&
            reviews.map(({ author, content, id }) => (
              <ReviewItem key={id}>
                <Author>Author: {author}</Author>
                <Description>{content}</Description>
              </ReviewItem>
            ))}
        </ul>
    );
  }
};

export default Reviews;


