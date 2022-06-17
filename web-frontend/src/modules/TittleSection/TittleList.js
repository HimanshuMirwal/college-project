import React from 'react';
import "./Css/TittleList.css";
import Axios from "axios";
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataList: [],
            // {TittleName:"askjbksj"}, {TittleName:"kasnlsakn"},{TittleName:"askbkab"}, {TittleName:"8wuwq"}, {TittleName:"anlqwknl"}, {TittleName:"ankan"}, {TittleName:"akjkjank"}, {TittleName:"alnlanlas"}, {TittleName:"alnsaln"}
            TitleValue: null,
            dataSubTitle: [],
            toggle: false
        };
        this.myFunction = this.myFunction.bind(this);
    }
    async componentDidMount(props) {
        await Axios.get("http://localhost:5000/tittle/gettitle/")
            .then(
                (result) => {
                    this.setState({
                        DataList: result.data
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
        await Axios.get("http://localhost:5000/subtittle/getsubtitle/")
            .then((res) => {
                console.log("subtitle", res)
                this.setState({
                    dataSubTitle: res.data
                })
            }).catch(Err => console.log(Err));
    };

    myFunction() {
        (this.state.toggle) ? this.setState({ toggle: false }) : this.setState({ toggle: true });
    }
    render() {
        return (
            <>
                <div className='parentDiv'>
                    <div className='SearchbarParentDiv'>
                        <SearchBar />
                    </div>
                    <div className='horizontalMenuDiv'>
                        {/* <FullPage DataList={this.state.DataList} dataSubTitle={this.state.dataSubTitle} /> */}
                        <HorizontalList DataList={this.state.DataList} dataSubTitle={this.state.dataSubTitle} />
                    </div>
                </div>
            </>
        );
    }
}
const HorizontalList = (props) => {
    return (
        props.DataList.map((data) => {
            return (<>
                <div class="dropdown">
                    <button class="btn  dropdown-toggle" style={{ background: "#6A9C78" }} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {data.TittleName}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {
                            props.dataSubTitle.map(subtittle => {

                                if (subtittle.TittleName === data.TittleName) {
                                    return (<a class="dropdown-item" href={"/subtitle/" + data.TittleName + "/" + subtittle.subtittleName}>
                                        {subtittle.subtittleName}
                                    </a>)
                                }
                            })
                        }

                    </div>
                </div>
                {/* <a class="nav-link dropdown-toggle TittleLink" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {data.TittleName}
                                            </a>
                                            <div class="dropdown-menu DropDownMenu" style={{display:"block"}} aria-labelledby="navbarDropdown">
                                                {
                                                    props.dataSubTitle.map(subtittle => {
                                                        
                                                        if (subtittle.TittleName === data.TittleName) {
                                                            return (<Link to={{
                                                                pathname: "/subtitle/" + data.TittleName + "/" + subtittle.subtittleName,
                                                                TitleValue: subtittle.TittleName,
                                                                SubTittleValue: subtittle.subtittleName
                                                            }}
                                                                // className="dropdown-item dropDownItem"
                                                            >{subtittle.subtittleName}
                                                            </Link>)
                                                        }
                                                    })
                                                }
                                            </div> */}

            </>)

        })
    )
}


const FullPage = (props) => {
    return (
        <p style={{ margin: "0", width: "100%", height: "auto" }}>
            <ul class="navbar-nav mr-auto">
                <p style={{ margin: "0", width: "100%" }} className="">
                    {
                        props.DataList.map((data) => {
                            return (<>
                                <li class="nav-item dropdown FullPage1stLiItem">
                                    <a class="nav-link dropdown-toggle TittleLink" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ float: "left", marginRight: "10px" }}>
                                        {data.TittleName}
                                    </a>
                                    <div class="dropdown-menu DropDownMenu" aria-labelledby="navbarDropdown">
                                        {
                                            props.dataSubTitle.map(subtittle => {
                                                if (subtittle.TittleName === data.TittleName) {
                                                    return (<Link to={{
                                                        pathname: "/subtitle/" + subtittle.TittleName + "/" + subtittle.subtittleName,
                                                        TitleValue: subtittle.TittleName,
                                                        SubTittleValue: subtittle.subtittleName
                                                    }}
                                                        className="dropdown-item dropDownItem"
                                                    >{subtittle.subtittleName}
                                                    </Link>)
                                                }
                                            })
                                        }
                                    </div>
                                </li>

                            </>)

                        })
                    }
                </p>


            </ul>
        </p>
    )
}
// const MobilePage = (props)=>{
//     return( 
//             <ul class="navbar-nav mr-auto ULDisplay" >
//                                 {
//                                     props.DataList.map((data) => {
//                                         return (<>
//                                             <li class="nav-item dropdown">
//                                             <a class="nav-link dropdown-toggle TittleLink" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                                 {data.TittleName}
//                                             </a>
//                                             <div class="dropdown-menu DropDownMenu" aria-labelledby="navbarDropdown">
//                                                 {
//                                                     props.dataSubTitle.map(subtittle => {
//                                                         if (subtittle.TittleName === data.TittleName) {
//                                                             return (<Link to={{
//                                                                 pathname: "/subtitle/" + subtittle.TittleName + "/" + subtittle.subtittleName,
//                                                                 TitleValue: subtittle.TittleName,
//                                                                 SubTittleValue: subtittle.subtittleName
//                                                             }}
//                                                                 className="dropdown-item dropDownItem"
//                                                             >{subtittle.subtittleName}
//                                                             </Link>)
//                                                         }
//                                                     })
//                                                 }
//                                             </div>
//                                         </li>
//                                         </>)
//                                     })
//                                 }
//                             </ul>
//     )
//     }
export default App;
