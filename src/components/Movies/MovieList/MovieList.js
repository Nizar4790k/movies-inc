import React, { useEffect, useState } from 'react';
import config from '../../../config.js';
import Movie from '../Movie/Movie';

const MovieList = () => {

    const [movies, setMovies] = useState([]);
    
    const api_key = config[process.env.NODE_ENV].api_key;
    


    useEffect(() => {

        const fetchMovies = async () => {

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

       
     

        fetchMovies();
      

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