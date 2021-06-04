import React,{useState} from "react";


import { BrowserRouter as Router, Route, Switch,useHistory} from "react-router-dom";
import Session from './components/Session/Session';
import Auth from "./components/Auth/Auth";
import Home from './components/Home/Home';
import MovieDetails from "./components/Movies/MovieDetails/MoviesDetails";
import NavBar from "./components/NavBar/NavBar";



  const  App = ()=>{

    const [user,setUser]= useState([]);
    const [isSignedIn,setSignedIn]=useState(false);
    

    const loadUser= (user)=>{
      
      
      if(!isSignedIn){
        setSignedIn(true);
        setUser(user);
        
      }

      
    }

    const onSignOut = ()=>{
      setUser([]);
      setSignedIn=false;
    }

   
    

  return (
   <Router>
   <NavBar username={user.username} onSignOut={onSignOut}></NavBar>
     <Switch>
       <Route path='/Session'  component={()=><Session/>}></Route>
       <Route path='/Auth' exact component={Auth}></Route>
       <Route path='/' exact component={Auth}></Route>
       <Route path='/Home'  component={()=><Home loadUser={loadUser} isSignedIn={isSignedIn} ></Home>}></Route>
       <Route path='/Movies/:id'  
              render={({match})=><MovieDetails id={match.params.id} user={user}/>}

              /> 

     </Switch>
   </Router>
  );
}

export default App;
