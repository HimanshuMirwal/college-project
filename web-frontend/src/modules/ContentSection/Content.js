import React, { Component } from "react";
import "./css/Content.css";
import Sidebar from "./SidebarSection/Sidebar";
import Information from './InformationSection/Information';
export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HeightInformationDiv: "100%"
        }

        this.SetHeightInformationDiv = this.SetHeightInformationDiv.bind(this);
    }
    SetHeightInformationDiv(value) {
        this.setState({
            HeightInformationDiv: value
        })
        console.log("from Content" + value);
    }
    render() {
        return (
            <>
                <div className="mainDiv">
                    <Information TitleValue={this.props.SendTitleValueFunction} SendSubTitleValue={this.props.SendSubTitleValue} heigthFunction={this.SetHeightInformationDiv} />
                    <Sidebar TitleValue={this.props.SendTitleValueFunction} HeightValueOfInformationDiv={this.state.HeightInformationDiv} />
                </div>
                <div class="p-5  rounded-3" style={{background:"#6A9C78"}}>
                        <div class="container-fluid py-5">
                            <h1 class="display-5 fw-bold">Web Blog Compiler</h1>
                            <hr style={{width:"50%"}}/>
                            <p class="col-md-12  fs-4" style={{color:"#333"}}>
                                Web Blog provide you an online compiler. This compiler is useful while learning about programming.
                                To get most out of tutorial you have to write code yourself.
                            </p>
                            <button class="btn btn-lg" type="button" style={{background:"#333", color:"#F9F8ED"}} onClick={()=>{
                                window.location.href="http://localhost:3000/compiler-web-blog"
                            }}>Example button</button>
                        </div>
                </div>
            </>
        )
    }
}