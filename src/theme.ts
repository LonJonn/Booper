import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import blue from "@material-ui/core/colors/blue";

export default createMuiTheme({
	typography: {
		fontFamily: ["-apple-system", "Inter", "Roboto", "Arial"].join(", "),
	},
	palette: {
		type: "dark",
		primary: { main: blue.A400 },
	},
	shape: { borderRadius: 8 },
});
