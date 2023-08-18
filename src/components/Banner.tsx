import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { requests } from '@/lib/request';
import styles from './Banner.module.scss';

type movieProps = {
  title?: string;
  name?: string;
  orignal_name?: string;
  backdrop_path?: string;
  overview?: string;
};

export const Banner = () => {
  const [movie, setMovie] = useState<movieProps>({});
  useEffect(() => {
    // reactStrictModeがtrueの場合にuseEffectが2回実行され表示データも2回更新されるためクリーンアップで対処
    let ignore = false;
    async function fetchData() {
      const request = await axios.get(requests.feachNetflixOriginals);
      const dispMovie = request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
      ];
      if (!ignore) {
        setMovie(dispMovie);
      }
      return request;
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

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
