import { useState } from 'react';
import './Compiler.css';
import Editor from "@monaco-editor/react";
import Navbar from './Navbar';
import Axios from 'axios';
// import spinner from './spinner.svg';

function Compiler() {

// State variable to set users source code
const [userCode, setUserCode] = useState(``);

// State variable to set editors default language
const [userLang, setUserLang] = useState("python");

// State variable to set editors default theme
const [userTheme, setUserTheme] = useState("vs-dark");

// State variable to set editors default font size
const [fontSize, setFontSize] = useState(20);

// State variable to set users input
const [userInput, setUserInput] = useState("");

// State variable to set users output
const [userOutput, setUserOutput] = useState("");

// Loading state variable to show spinner
// while fetching data
const [loading, setLoading] = useState(false);

const options = {
	fontSize: fontSize
}

// Function to call the compile endpoint
function compile() {
	setLoading(true);
	if (userCode === ``) {
	return
	}

	// Post request to compile endpoint
	Axios.post(`http://localhost:5000/compile`, {
	code: userCode,
	language: userLang,
	input: userInput }).then((res) => {
        console.log(res);
    if(res.data.output){
        setUserOutput(res.data.output);
    }else{
        setUserOutput(res.data);
    }
    console.log(res.data.output)
	}).then(() => {
	setLoading(false);
	})
}

// Function to clear the output screen
function clearOutput() {
	setUserOutput("");
}

return (
	<div className="App">
	<Navbar
		userLang={userLang} setUserLang={setUserLang}
		userTheme={userTheme} setUserTheme={setUserTheme}
		fontSize={fontSize} setFontSize={setFontSize}
	/>
	<div className="main">
		<div className="left-container">
		<Editor
			options={options}
			height="calc(100vh - 50px)"
			width="100%"
			theme={userTheme}
			language={userLang}
			defaultLanguage="python"
			defaultValue="# Enter your code here"
			onChange={(value) => { setUserCode(value) }}
		/>
		<button className="run-btn" onClick={() => compile()}>
			Run
		</button>
		</div>
		<div className="right-container" style={userTheme==="vs-dark"?{background:"#242424"}:{background:"whitesmoke"}}>
		<h4>Input:</h4>
		<div className="input-box" >
			<textarea id="code-inp"
            style={userTheme==="vs-dark"?{background:"#242424",color:"#242424"}:{background:"whitesmoke",color:"#242424"}}
            onChange=
			{(e) => setUserInput(e.target.value)}>
			</textarea>
		</div>
		<h4>Output:</h4>
		{loading ? (
			<div className="spinner-box" 
            style={userTheme==="vs-dark"?{background:"#242424",color:"whitesmoke"}:{background:"whitesmoke",color:"#242424"}}>
            <div class="spinner-border" style={userTheme==="vs-dark"?{background:"#242424",color:"whitesmoke",width: "5rem", height: "5rem"}:{background:"whitesmoke",color:"#242424",width: "5rem", height: "5rem"}}
            role="status">
                    <span class="sr-only">Loading...</span>
                </div>
			</div>
		) : (
			<div className="output-box"
            style={userTheme==="vs-dark"?{background:"#242424",color:"whitesmoke"}:{background:"whitesmoke",color:"#242424"}}
            >
			<pre>{userOutput}</pre>
			<button onClick={() => { clearOutput() }}
				className="clear-btn">
				Clear
			</button>
			</div>
		)}
		</div>
	</div>
	</div>
);
}

export default Compiler;
