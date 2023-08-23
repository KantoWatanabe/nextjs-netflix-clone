import { Dispatch, SetStateAction, useState, useCallback } from "react";
import axios from "@/lib/axios";
import { requests } from '@/lib/request';

export const useTrailerUrl = (): [string | null, { setTrailerUrl: Dispatch<SetStateAction<string | null>>; fetchTrailerUrl: (movie_id: string) => Promise<void>; }] => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

  const fetchTrailerUrl = useCallback(async (movie_id: string) => {
    let trailerurl = await axios.get(
      requests.trailerUrl(movie_id)
    );
    setTrailerUrl(trailerurl.data.results[0]?.key);
  }, []);
  return [trailerUrl, { setTrailerUrl, fetchTrailerUrl }];
};
