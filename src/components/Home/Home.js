import React, { useEffect, useState } from 'react';
import MovieList from '../Movies/MovieList/MovieList';




const Home = ({loadUser,isSignedIn})=>{

    
    const api_key= process.env.REACT_APP_API_KEY;
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