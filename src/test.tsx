import * as ReactDOM from "react-dom";
import * as React from "react";

import theme from "./theme";

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

import { getVisibleNodes, search } from "./search";

interface AppProps {
	hide: () => void;
}

const App: React.FC<AppProps> = ({ hide }) => {
	const classes = useStyles();

	// Get visible nodes on mount
	const nodes = React.useMemo(getVisibleNodes, []);

	const [query, setQuery] = React.useState("");
	const [selected, setSelected] = React.useState(0);

	// prettier-ignore
	// Whenever search changes, re-filter
	const results = React.useMemo(() => (
		query
			? search(nodes, query)
			: nodes.map((node) => ({ item: node }))
	), [query]);

	// Reset cursor to top if out of index
	React.useEffect(() => {
		if (selected > results.length - 1) setSelected(0);
	}, [results, selected]);

	// Highlight current selection
	React.useEffect(() => {
		const selectedNode = results[selected].item;
		selectedNode.style.outline = "5px solid yellow";

		return () => {
			selectedNode.style.outline = "";
		};
	}, [selected]);

	// List navigation with arrowkeys
	const handleInput: React.KeyboardEventHandler = (e) => {
		if (results.length === 0) return;

		if (e.key === "ArrowUp") {
			e.preventDefault();
			const newSelected =
				selected > 0 ? selected - 1 : results.length - 1;
			setSelected(newSelected);
		} else if (e.key === "ArrowDown" || e.key === "Tab") {
			e.preventDefault();
			const newSelected =
				selected < results.length - 1 ? selected + 1 : 0;
			setSelected(newSelected);
		} else if (e.key === "Escape") {
			e.preventDefault();
			hide();
		}
	};

	// Boop the selected button
	const boop: React.FormEventHandler = (e) => {
		e.preventDefault();

		results[selected].item.click();
		hide(); // Hide modal after booping the selected button
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
					placeholder="Search boop by text"
					autoFocus
					value={query}
					onKeyDown={handleInput}
					onChange={(e) => setQuery(e.target.value)}
					onBlur={hide}
				/>
			</form>
			<List component="nav">
				{results.map((result, idx) => (
					<ListItem key={idx} button selected={selected === idx}>
						<ListItemText primary={result.item.textContent} />
					</ListItem>
				))}
			</List>
			<Typography
				variant="subtitle1"
				color="textSecondary"
				align="center"
			>
				{results.length > 0 ? (
					<>
						Showing <b>{results.length}</b> of <b>{nodes.length}</b>
					</>
				) : (
					<> No boops found 😢 </>
				)}
			</Typography>
		</Box>
	);
};

const Wrap = () => {
	const [visible, setVisible] = React.useState(false);

	return (
		<>
			{visible && <App hide={() => setVisible(false)} />}
			<button onClick={() => setVisible((v) => !v)}>toggle</button>
			<button onClick={() => console.log("weeee!")}>woggle</button>
		</>
	);
};

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Wrap />
		<CssBaseline />
	</ThemeProvider>,
	document.getElementById("app")
);
