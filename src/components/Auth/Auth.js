import config from '../../config';
import {useEffect} from "react";
const Auth =()=>{

      
       const api_key = config[process.env.NODE_ENV].api_key;
       
        
        async function authenticate(){
      
           
          const  response = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${api_key}`);
          const result = await response.json();
          
          const token = result.request_token;
      
          
      
          window.location.href =`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/Session`;
        
        
        }
       
        
        useEffect( ()=>{
      
           
          authenticate();
          
        
        },[]);
      
        return(null)

}

export default Auth;