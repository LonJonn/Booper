import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const width = 550;

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		wrapper: {
			position: "absolute",
			width: width,
			top: "15vh",
			left: `calc(50vw - calc(${width}px / 2))`,
		},
		form: {
			padding: theme.spacing(0, 2, 2),
		},
		title: {
			fontWeight: 700,
			textTransform: "uppercase",
			letterSpacing: 1.5,
		},
	})
);
