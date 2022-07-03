import React from 'react';
import "./Css/TittleList.css";
import Axios from "axios";
import "./helper.js";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataList: [            
                // {TittleName:"askjbksj"}, {TittleName:"kasnlsakn"},{TittleName:"askbkab"}, {TittleName:"8wuwq"}, {TittleName:"anlqwknl"}, {TittleName:"ankan"}, {TittleName:"akjkjank"}, {TittleName:"alnlanlas"}, {TittleName:"alnsaln"}
        ],
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
                        ...this.state,
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
                <nav class="navbar navbar-expand-lg justify-content-start parentDiv h-auto" style={{ background: "#6A9C78", color: "whitesmoke" }}>
                <HorizontalList DataList={this.state.DataList} dataSubTitle={this.state.dataSubTitle} />
                </nav>
            </>
        );
    }
}
const HorizontalList = (props) => {
    return (
        props.DataList.map((data) => {
            return (<>
                <div class="dropdown itemsLinks" >
                    <span class="nav-item dropdown">
                        <span class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {data.TittleName}
                        </span>
                        <ul class="dropdown-menu " aria-labelledby="navbarDropdown">
                            {
                                props.dataSubTitle.map(subtittle => {

                                    if (subtittle.TittleName === data.TittleName) {
                                        return (<li>
                                            <a class="dropdown-item"
                                                href={"/subtitle/" + data.TittleName + "/" + subtittle.subtittleName}>
                                                {subtittle.subtittleName}
                                            </a>
                                        </li>)
                                    }
                                })
                            }
                        </ul>
                    </span>

                </div>

            </>)

        })
    )
}
export default App;
