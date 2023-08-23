import { useState, useEffect } from "react";
import { useCommunicate } from "@/hooks/useCommunicate";

export type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

export const useMovie = (fetchUrl: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [{ error, loading }, { communicate }] = useCommunicate<Movie[], null>(fetchUrl, 'GET');

  useEffect(() => {
    async function fetchData() {
      let response = await communicate();
      setMovies(response?.data.results);
    };
    fetchData();
  }, [communicate]);

  return {movies, error, loading};
};
