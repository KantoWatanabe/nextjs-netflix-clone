import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { requests } from '@/lib/request';

export type movieProps = {
  title?: string;
  name?: string;
  orignal_name?: string;
  backdrop_path?: string;
  overview?: string;
};

export const useRandomMovie = () => {
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
  return movie;
};
