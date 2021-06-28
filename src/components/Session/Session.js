
import React, { useEffect, useState } from 'react';
import {Redirect} from 'react-router-dom';


const Session = ()=>{
    const api_key = process.env.REACT_APP_API_KEY;
    const params = new URLSearchParams(window.location.search);
    
 
   
    
    const [approved,setApproved] = useState(params.get("approved"));
    const [denied,setDenied] = useState(params.get('denied'))
    const [request_token,setRequestToken] = useState(params.get('request_token'))
   


  


  useEffect(async ()=>{

    async function fetchSessionId(){
        const response = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${api_key}`,{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                request_token:request_token
            })
        })
       
        const result = await response.json();
        
        localStorage.setItem('session_id',result.session_id);
        console.log(result.session_id);


        

        

    }

   

    
   fetchSessionId()
    


  },[])  


  

   
if(approved){

   return <Redirect to="/Home"></Redirect>
    

}else if(denied){
    alert("You need to approve permissions to use the app");
    localStorage.removeItem('session_id')

    return <Redirect to="/"></Redirect>
}else{
    alert("An error ocurred!")
    return <Redirect to="/Auth"></Redirect>
}


    
}

export default Session;