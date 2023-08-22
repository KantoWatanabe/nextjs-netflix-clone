import styles from './Banner.module.scss';
import { useRandomMovie, movieProps } from '@/hooks/useRandomMovie';

export const Banner = () => {
  const movie: movieProps = useRandomMovie();

  function truncate(str: string|undefined, n: number) {
    if (str !== undefined) {
      return str.length > n ? str?.substr(0, n - 1) + "..." : str;
    }
  }

  return (
    <header
      className={styles.Banner}
      style={{
        backgroundSize: "auto",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "top center",
      }}
    >
      <div className={styles['Banner-contents']}>
        <h1 className={styles['Banner-title']}>
          {movie?.title || movie?.name || movie?.orignal_name}
        </h1>
        <div className={styles['Banner-buttons']}>
          <button className={styles['Banner-button']}>Play</button>
          <button className={styles['Banner-button']}>My List</button>
        </div>

        <h1 className={styles['Banner-description']}>{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className={styles['Banner-fadeBottom']} />
    </header>
  );
};
