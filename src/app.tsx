import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Wrapper } from "./app.styles";
import theme from "./theme";

const [, set] = useState();


const App: React.FC = () => (
	// <ThemeProvider theme={theme}>
	// 	<Wrapper>hey</Wrapper>
	// </ThemeProvider>
);

const mount = document.createElement("div");
mount.classList.add("booper-wrapper");
document.body.appendChild(mount);
ReactDOM.render(<App />, mount);
