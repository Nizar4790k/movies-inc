import React, { useEffect, useState } from 'react';
import MovieList from '../Movies/MovieList/MovieList';
import config  from '../../config';



const Home = ({loadUser,isSignedIn})=>{

    
    const api_key= config[process.env.NODE_ENV].api_key;
    const [user,setUser]=useState([]);
    const [sessionId,setSessionId]=useState(localStorage.getItem('session_id'))


    

    useEffect(()=>{
        
        
        const fetchUser = async ()=>{

        
            const response = await fetch('https://api.themoviedb.org/3/account?api_key='+api_key+"&session_id="+sessionId);
    
            const result = await response.json();
            
            
            
            if(!isSignedIn){
                loadUser(result);
            }
            
    
          
            
    
            
    
        }

        fetchUser();
        
     

       

    },[])




    return (
    <div>
        <MovieList user={user}></MovieList>
    </div>
        
    );

}

export default Home;