import React, { Component } from "react";
import "./css/Information.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import $ from 'jquery';
import parse from 'html-react-parser'
import Spinner from "../../Spinner/Spinner";

let lastHeight = $("#abc").height();
let lastWidth = $("#abc").width();

function checkHeightChange() {
    const newHeight = $("#abc").height();
    const newWidth = $("#abc").width();

    if (lastHeight != newHeight || lastWidth != newWidth) {

        // assign the new dimensions 
        lastHeight = newHeight;
        // console.log(newHeight);
        window.CallFunction.ChangeHeightFunction(newHeight + 60);
        lastWidth = newWidth;
    }
}
setInterval(checkHeightChange, 500);
export default class Information extends Component {
    constructor(props) {
        super(props);
        window.CallFunction = this;
        this.state = {
            Data: [],
        }
        this.ChangeHeightFunction = this.ChangeHeightFunction.bind(this);
    }
    async componentDidMount() {
       await Axios.get("http://localhost:5000/place/getplace/")
            .then((res) => {
                console.log(res.data)
                this.setState({
                    Data: res.data
                })
                var clientHeight = document.getElementById('abc').offsetHeight;
                this.props.heigthFunction(clientHeight);
            })
            .catch(Err => console.log(Err));
    }
    ChangeHeightFunction(value) {
        this.props.heigthFunction(value);
    }

    render() {
        return (
            <>
                {Object.keys(this.state.Data).length === 0 ? (<Spinner />) :
                    (<div className="mainInformation" id="abc">
                        {
                            this.state.Data.map((value) => {
                                if (value.TittleName === this.props.TitleValue && value.subtittleName === this.props.SendSubTitleValue) {
                                    return (<div className="card" style={{ "width": "100%", "margin": "1% auto", background: "#F9F8ED" }} key={value._id + "kqlwnklqnwl"}>
                                        <div className="card-body">
                                            <h2 className="card-title InformationHeading" >{value.PlaceForTour}</h2>
                                            <hr></hr>
                                            <img className="imageInfo" src={value.imageLinksArray[0]} alt={value.PlaceForTour} />
                                            <hr></hr>
                                            <div className="col-lg-12">
                                                <h4 className="card-subtitle mb-2 text-muted">{value.city}</h4>
                                                <p className="card-text paragraphInformation" >{parse(value.PlaceTourExplaination.substring(0, 300))}</p>
                                                <Link to={{
                                                    pathname: "/description:" + value._id,
                                                    state: {
                                                        fromNotifications: value._id
                                                    }
                                                }} className="card-link" style={{ textDecoration: "none", color: "white" }}>
                                                    <button className="btn  btn-outline-success ">Read more</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>);
                                }
                            })
                        }
                    </div>)}
            </>
        )
    }
} 