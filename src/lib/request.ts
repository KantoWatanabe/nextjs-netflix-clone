const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w440_and_h660_face';

export const requests ={
  feachTrending:`/trending/all/week?api_key=${API_KEY}&language=en-us`,
  feachNetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
  feactTopRated:`/discover/tv?api_key=${API_KEY}&languager=en-us`,
  feactActionMovies:`/discover/tv?api_key=${API_KEY}&with_genres=28`,
  feactComedyMovies:`/discover/tv?api_key=${API_KEY}&with_genres=35`,
  feactHorrorMovies:`/discover/tv?api_key=${API_KEY}&with_genres=27`,
  feactRomanceMovies:`/discover/tv?api_key=${API_KEY}&with_genres=10749`,
  feactDocumentMovies:`/discover/tv?api_key=${API_KEY}&with_genres=99`,
  trailerUrl:(movie_id: string): string => {
    return `/movie/${movie_id}/videos?api_key=${API_KEY}`;
  },
}
