import { IMAGE_BASE_URL } from '@/lib/request';
import styles from './Row.module.scss';
import YouTube from 'react-youtube';
import { useMovie, Movie } from '@/hooks/useMovie2';
import { useTrailerUrl } from '@/hooks/useTrailerUrl';

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

export default function Row({ title, fetchUrl, isLargeRow }: Props) {
  const [trailerUrl, { setTrailerUrl, fetchTrailerUrl }] = useTrailerUrl();
  const {movies, loading, error} = useMovie(fetchUrl);

  if (movies.length === 0) {
    return false;
  }

  const opts: Options = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      fetchTrailerUrl(movie.id);
    }
  };

  return(
    <div className={styles.Row}>
      <h2>{title}</h2>
      {error && (<div>{error.message}</div>)}
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <div className={styles['Row-posters']}>
            {/* ポスターコンテンツ */}
            {movies.map((movie, i) => (
              <img
                key={movie.id}
                className={`${styles['Row-poster']} ${isLargeRow && styles['Row-poster-large']}`}
                src={`${IMAGE_BASE_URL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            ))}
          </div>
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </>  
      )}
    </div>
  );
};
