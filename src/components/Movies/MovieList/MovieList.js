import React, { useEffect, useState } from 'react';

import Movie from '../Movie/Movie';

const MovieList = () => {

    const [movies, setMovies] = useState([]);
    
    const api_key = process.env.REACT_APP_API_KEY;
    
    useEffect(() => {

        const fetchMoviesOrderedByTitle = async () => {

            const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`);
            const page = await response.json();
            
            
            function predicateBy(prop){
                return function(a,b){
                   if (a[prop] > b[prop]){
                       return 1;
                   } else if(a[prop] < b[prop]){
                       return -1;
                   }
                   return 0;
                }
             }

            const movies = page.results.sort(predicateBy("title"));
            setMovies(movies);

        }

        fetchMoviesOrderedByTitle();
      

    }, [])

    return (
            
            movies.map((movie, i) => {

                
                      return(
                            <div>
                            <br></br>
                             <Movie movie={movie}  key={i} id={i} />
                             <br></br>
                            </div>
                          )
                    }
                    
                )
              
    );
}

export default MovieList;