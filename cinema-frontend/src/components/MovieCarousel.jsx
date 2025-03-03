import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './MovieCarousel.css'; // Import the CSS file for styling
import PropTypes from 'prop-types';

const MovieCarousel = ({ movies }) => {
  return (
    <Carousel showThumbs={false} showStatus={false} autoPlay infiniteLoop>
      {movies.map((movie) => (
        <div key={movie.id}>
          <img src={`http://localhost:3000${movie.poster_url}`} alt={movie.title} />
        </div>
      ))}
    </Carousel>
  );
};
MovieCarousel.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieCarousel;