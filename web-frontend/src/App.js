import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "./Main";
import FullDescription from "../src/modules/FullDescriptioSection/FullDescription";
import AboutInfo from "./modules/AboutSection/AboutInfo";


export default class App extends React.Component {
    render() {
        return (
            <div>
                {}
                <Router>
                    <Route path="/" exact component={Main} />
                    {/*<Route path="home" component={Home} />*/}
                    <Route path="/description" component={FullDescription} />
                    <Route path="/description:Value" component={FullDescription} />
                    {/* <Route path="/place" component={AdminDashboard} /> */}
                    <Route path="/title/:tittle" component={Main} />
                    <Route path="/subtitle/:tittle?/:subtittle" component={Main} />
                    <Route path="/about" component={AboutInfo} />
                </Router>
            </div>
        )
    }
}
