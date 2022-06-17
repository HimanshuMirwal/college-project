import React, { Component } from "react";
import "./css/Sidebar.css";
import Axios from "axios";
import { Link } from "react-router-dom";
export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataNotice: [],
            display: true
        }
        this.OnClickSideDisplay = this.OnClickSideDisplay.bind(this);
    }
    async componentDidMount(props) {
        await Axios.get("http://localhost:5000/notice/getnotice/")
            .then((res) => {
                console.log(res.data)
                this.setState({
                    dataNotice: res.data
                })
            })
            .catch(Err => console.log(Err));
    }
    OnClickSideDisplay() {
        const data = document.getElementById("Sidebar");
        if (this.state.display) {
            data.className = "mainSidebar"
            data.style.height = "700px"


        } else {
            data.className = "mainSidebarDisplay"
            data.style.height = "0"
        }
        this.state.display ? this.setState({
            display: false
        }) : this.setState({
            display: true
        })
    }
    render() {
        return (
            <>
                <div className="MainSideBar">
                    <div className="TrendingTopics">
                        <h2>Latest Updates</h2>
                    </div>
                    <div className="UListDiv">
                        <ul className="UList">
                        {
                            this.state.dataNotice.map(data=>{
                                return <Link to={data.NoticeLink}><li className="ListItem">{data.Notice}</li></Link>
                            })
                        }
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}