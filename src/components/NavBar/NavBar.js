//IMPORTANT: THIS COMPONENT WORKS WELL WITH BOOTSTAP 4


import { Link, useHistory} from "react-router-dom";
const NavBar = ({username,onSignOut}) => {

  const history = useHistory();
    
    return (
        <header className="header">
        
        <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        
        <Link to="/Home" className="navbar-brand">Movies.Inc</Link>
       
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">

        <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
                
                <Link to="/Home" className="nav-link">Home</Link>
            </li>
           
        </ul>

        <ul className="navbar-nav">
        <li className="nav-item"><a className="nav-link" href="#">{username}</a></li>
        
        <li className="nav-item"> <button type="button" id="signout" className="btn btn-danger" onClick={()=>{
            
            history.push("/")
            onSignOut();
        
        }}>Sign out</button></li>
        </ul>


        </div>

    
       
       
      </nav>
      </div>
        </header>
       
      
    );
}


export default NavBar;