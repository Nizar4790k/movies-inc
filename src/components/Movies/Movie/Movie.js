import React, { useEffect,useState } from 'react';
import {  useHistory } from "react-router-dom";
import config from "../../../config";
import "./Movie.css";


const Movie = ({movie}) => {

    const history = useHistory();
    const [genres,setGenres] = useState([])


    const goToDetails = () => {
        history.push(`Movies/${movie.id}`);
      };
    

      useEffect(()=>{
        
        const fetchMoviesDetails = async () =>{
          const api_key = config[process.env.NODE_ENV].api_key;
          const response =  await fetch(`https://api.themoviedb.org/3/movie/ ${movie.id.toString()}?api_key=${api_key}&language=en-US`);
          const result = await response.json();
          setGenres(result.genres);
          
          
          

      }

      fetchMoviesDetails();

      },[])
    
/*
    return (
        
        <div className="card horizontal" >
            <img src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2"+movie.poster_path}  className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview}.</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><b>Release Date: </b>{movie.release_date}</li>
                <li className="list-group-item"><b>Average Vote: </b>{movie.vote_average}</li>
                <li className="list-group-item"><button className="btn btn-info" style={{"color":"white"}} onClick= {()=>{goToDetails()}} >View details</button></li>
                
            </ul>
            
        </div>
        
    );
    */

    return(
        <div className="card">
        <div className="row ">
          <div className="col-md-7 px-3">
            <div className="card-block px-6">
              <h4 className="card-title">{movie.title}</h4>
              <p className="card-text">
              {movie.overview}
              </p>
              <b>Average Vote: </b>{movie.vote_average}
              <br/>
              <p className="card-text"><b>Release Date: </b>{movie.release_date}</p>
              
              <p className="card-text"><b>Genres:</b></p>
              <ul>
                        
              {genres.map((genre, i) => {
                            return (<li key={i}>{genre.name}</li>)
                        })}


                    </ul>
              
             
              <button className="btn btn-info" style={{"color":"white"}} onClick= {()=>{goToDetails()}} >View details</button>
            </div>
          </div>
         
          <div className="col-md-5">
          <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}  className="card-img-top" alt="..."></img>
          </div>
          
        </div>
      </div>
 
 
    )

}

export default Movie;