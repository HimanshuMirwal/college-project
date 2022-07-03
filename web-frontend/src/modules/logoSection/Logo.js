import React from "react";
import { Link } from "react-router-dom";
import  "./Logo.css"
import SearchBar from "../SearchboxSection/SearchBar"
class Logo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav style={{ padding: " 2% 5% ",height:"auto", background:"#C4E3CB"}} className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
        <div className="d-flex justify-content-start">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        
          <a className="navbar-brand mx-2" href="/">
            <h1 style={{color:"#6A9C78"}}>
              Web Blog
            </h1>
          </a>
          </div>
          
          <div className="collapse navbar-collapse justify-content-start menuOrder" id="navbarNavDropdown">
            <ul className="navbar-nav" >
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/"><b>Home</b></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about"><b>About us</b></Link>
              </li>
            </ul>
            
          </div>
          <div class="w-50 searchboxOrder">
              <SearchBar />
              {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
          </div>   
        </div>
      </nav>
    )
  }
}

export default Logo;