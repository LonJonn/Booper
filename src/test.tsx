import * as React from "react";
import { useState, KeyboardEvent, FormEvent } from "react";
import * as ReactDOM from "react-dom";
import {
	Box,
	CssBaseline,
	TextField,
	ThemeProvider,
	createMuiTheme,
	Typography,
	makeStyles,
	List,
	ListItem,
	ListItemText,
	Theme,
	createStyles,
} from "@material-ui/core";
import styled from "styled-components";
import { blue } from "@material-ui/core/colors";

const width = 550;

// prettier-ignore
const btns = [
	{
		text: "uno",
	},
	{
		text: "duos",
	},
];

const theme = createMuiTheme({
	typography: {
		fontFamily: ["-apple-system", "Inter", "Roboto", "Arial"].join(", "),
	},
	palette: {
		type: "dark",
		primary: {
			main: blue.A400,
		},
	},
	shape: {
		borderRadius: 8,
	},
});

const Wrapper = styled(Box)`
	position: absolute;
	width: ${width}px;
	top: 15vh;
	left: calc(50vw - calc(${width}px / 2));
`;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			fontWeight: 700,
			textTransform: "uppercase",
			letterSpacing: 1.5,
		},
		form: {
			padding: theme.spacing(0, 2, 2),
		},
	})
);

const App: React.FC = () => {
	const classes = useStyles();

	const [selected, setSelected] = useState(0);
	const [results, setResults] = useState(btns);

	const handleInput = (e: KeyboardEvent) => {
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

	const boop = (e: FormEvent) => {
		e.preventDefault();
		console.log(results[selected]);
	};

	return (
		<ThemeProvider theme={theme}>
			<Wrapper py={2} boxShadow={24} borderRadius={8}>
				<form onSubmit={boop} className={classes.form}>
					<Typography
						variant="h5"
						align="center"
						gutterBottom
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
			</Wrapper>
			<CssBaseline />
		</ThemeProvider>
	);
};

ReactDOM.render(<App />, document.getElementById("app"));
