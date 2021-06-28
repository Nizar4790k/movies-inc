
import {useEffect} from "react";
const Auth =()=>{

      
       const api_key = process.env.REACT_APP_API_KEY;
       console.log(api_key);
        
        async function authenticate(){
          
           
          const  response = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${api_key}`);
          const result = await response.json();
          
          const token = result.request_token;
      
          
      
          window.location.href =`https://www.themoviedb.org/authenticate/${token}?redirect_to=https://movies-inc.herokuapp.com/Session`;
        
        
        }
       
        
        useEffect( ()=>{
      
           
          authenticate();
          
        
        },[]);
      
        return(null)

}

export default Auth;