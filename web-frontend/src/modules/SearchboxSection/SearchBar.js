import React, { useState } from 'react';
import "./Css/SearchBar.css";
import Axios from "axios";
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
const App = () => {
  
    const [myOptions, setMyOptions] = useState([])
    const [FullData, SetFullData] = useState([]);
    let uniqueChars ;
    const getDataFromAPI = async (e) => {
      const data = e.target.value;
      console.log(String.fromCharCode(e.which)); 
      await Axios.get('http://localhost:5000/place/getplace/')
      .then(async (res) => {
          console.log(res.data)
          await SetFullData(res.data);
        for (let i = 0; i < res.data.length; i++) {
          myOptions.push(res.data[i].PlaceForTour)
          myOptions.push(res.data[i].subtittleName)
          uniqueChars = [...new Set(myOptions)];
        }
        setMyOptions(uniqueChars);
      })
    }
    async function searchClicked() {
      let x = document.getElementById("myPassword").value;
      console.log(x);
      console.log(FullData);
      const PlaceArray =  FullData.map(data=>data.PlaceForTour);
      const subtittleArray =  FullData.map(data=>data.subtittleName);

      console.log(FullData)
      if(PlaceArray.includes(x)){
        await FullData.map(data=>{
          if(data.PlaceForTour === x){
            window.location.href="/description:"+data._id
          } 
        })
      }else if(subtittleArray.includes(x)){
        await  FullData.map(data=>{
          if(data.subtittleName === x){
            window.location.href="/subtitle/"+data.TittleName+"/"+data.subtittleName
          } 
        })
      }
      else{
        alert("not found.")
      }
    }
    function myKeyPress(e){
      if(e.key === "Enter"){
        searchClicked();
      }
      
    }
    
    return (
      <div className="SearchbarDiv">
        <Autocomplete
          freeSolo
          autoComplete
          autoHighlight
          options={myOptions}
          id="myPassword"
          renderInput={(params) => (
            <>
            <div className="TextAreaSearchbar">
            <TextField {...params}
              onChange={(e)=>getDataFromAPI(e)}
              label="Search Box"
              className="TextAreaSearch"
              id="myPassword"
              onKeyDown={(e)=>myKeyPress(e)}
            />
            </div>
            </>
          )}
        />
      </div>
    );
  }
    
  export default App
// export default SearchBar;
