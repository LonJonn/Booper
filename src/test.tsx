import * as ReactDOM from "react-dom";
import * as React from "react";
import {
	Box,
	CssBaseline,
	TextField,
	ThemeProvider,
	Typography,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";
import { useStyles } from "./app.styles";
import theme from "./theme";

const btns = [{ text: "uno" }, { text: "duos" }];

const App: React.FC = () => {
	const classes = useStyles();

	const [query, setQuery] = React.useState("");
	const [selected, setSelected] = React.useState(0);
	const [results, setResults] = React.useState(btns);

	const handleInput: React.KeyboardEventHandler = (e) => {
		if (e.key === "ArrowUp") {
			e.preventDefault();
			const newSelected =
				selected > 0 ? selected - 1 : results.length - 1;
			setSelected(newSelected);
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			const newSelected =
				selected < results.length - 1 ? selected + 1 : 0;
			setSelected(newSelected);
		}
	};

	const boop: React.FormEventHandler = (e) => {
		e.preventDefault();
		console.log(results[selected]);
	};

	return (
		<Box py={2} boxShadow={24} borderRadius={8} className={classes.wrapper}>
			<form onSubmit={boop} className={classes.form}>
				<Typography
					variant="h5"
					align="center"
					paragraph
					className={classes.title}
				>
					Search for Boop 😊
				</Typography>
				<TextField
					variant="outlined"
					fullWidth
					size="small"
					autoFocus
					onKeyDown={handleInput}
					onChange={(e) => setQuery(e.target.value)}
					value={query}
				/>
			</form>
			<List component="nav">
				{results.map((btn, idx) => (
					<ListItem
						key={idx}
						button
						selected={selected === idx}
						onClick={() => setSelected(idx)}
					>
						<ListItemText primary={btn.text} />
					</ListItem>
				))}
			</List>
		</Box>
	);
};

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<App />
		<CssBaseline />
	</ThemeProvider>,
	document.getElementById("app")
);
