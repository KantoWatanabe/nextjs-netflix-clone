import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { IMAGE_BASE_URL } from '@/lib/request';
import styles from './Row.module.scss';

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

export default function Row({ title, fetchUrl, isLargeRow }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  if (movies.length === 0) {
    return false;
  }

  return(
    <div className={styles.Row}>
      <h2>{title}</h2>
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
          />
        ))}
      </div>
    </div>
  );
};
