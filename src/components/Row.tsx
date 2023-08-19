import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { IMAGE_BASE_URL } from '@/lib/request';
import styles from './Row.module.scss';
import { requests } from '@/lib/request';
import YouTube from 'react-youtube';

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

type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

export default function Row({ title, fetchUrl, isLargeRow }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

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
      let trailerurl = await axios.get(
        requests.trailerUrl(movie.id)
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };

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
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
