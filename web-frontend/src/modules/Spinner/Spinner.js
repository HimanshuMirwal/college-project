import React from "react";
import Styles from "./Spinner.css"
class Spinner extends React.Component {
    render() {
        return (
            <div className={"mainSpinnerDiv"}>
                <div class="spinner-border" style={{color:"#f8f9fa",width: "5rem", height: "5rem"}}  role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

export default Spinner;