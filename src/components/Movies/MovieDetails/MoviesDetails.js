import React, { useEffect, useState } from 'react';
import config from '../../../config';
import ReactStars from 'react-rating-stars-component'
import "./MoviesDetails.css"
import { useHistory } from 'react-router-dom';



const MovieDetails = ({ id, user }) => {




    const [movie, setMovie] = useState('');
    const [idx, setIdx] = useState(Number(id));
    const [genres, setGenres] = useState([]);
    const [ratedMovies, setRatedMovies] = useState([]);
    const [rating, setRating] = useState(0);

    


    const api_key = config[process.env.NODE_ENV].api_key;


    const history = useHistory();

    const getBacktoMovies = () => {
        history.push('/Home')
    }

    useEffect(() => {

        const getData = async function () {

            const session_id = localStorage.getItem('session_id')

            const urls = [
                `https://api.themoviedb.org/3/account/${user.id}/rated/movies?api_key=${api_key}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`,
                `https://api.themoviedb.org/3/movie/ ${idx.toString()}?api_key=${api_key}&language=en-US`
            ]


            const [page, movie] = await Promise.all(urls.map(async function (url) {
                const response = await fetch(url)
                return response.json();

            }));

            let ratedMovies = page.results;
            setRatedMovies(ratedMovies)

            ratedMovies.forEach((movie) => {

                if (idx === movie.id) {
                    console.log(movie.rating);
                    setRating(movie.rating);
                }
    
    
            })


            setMovie(movie)
            setGenres(movie.genres);





        }

        getData();

    }, [])


   



    const rateMovie = async (newRating) => {
        const session_id = localStorage.getItem('session_id')


        await fetch(`https://api.themoviedb.org/3/movie/${idx}/rating?api_key=${api_key}&session_id=${session_id}`, {

            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },

            body: JSON.stringify({
                value: (newRating)
            })
        }).catch((err) => { console.log(err) })



    }





    return (


        <div>
            <br></br>
            <br></br>


            <div className="card" style={{ "width": "18 rem" }}>
                <img src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + movie.poster_path} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{movie.overview}.</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Release Date: </b>{new Date(movie.release_date).getFullYear()}</li>
                    <li className="list-group-item"><b>Average Vote: </b>{movie.vote_average}</li>
                    <li className="list-group-item">
                        <b>Rate Now</b>


                        <ReactStars
                            id="stars"
                            count={10}
                            value={rating}
                            onChange={rateMovie}
                            size={24}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />

                    </li>

                </ul>

                <div className="card-body">
                    <b>Genres:</b>
                    <ul>
                        {genres.map((genre, i) => {
                            return (<li key={i}>{genre.name}</li>)
                        })}


                    </ul>



                </div>

                <ul className="list-group list-group-flush">

                    <li className="list-group-item"><button className="btn btn-danger" style={{ "color": "white" }} onClick={() => { getBacktoMovies() }}>Get back</button></li>
                </ul>


            </div>
        </div>


    );

};

export default MovieDetails;