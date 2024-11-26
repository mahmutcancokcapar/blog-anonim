import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	card: {
		backgroundColor: "#fff",
		margin: "10px 0",
		padding: "20px",
		width: "80%",
		borderRadius: "10px",
		boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
		animation: "$fadeIn 0.5s ease-out",
	},
	content: {
		fontSize: "1.1rem",
		color: "#333",
	},
	"@keyframes fadeIn": {
		"0%": {
			opacity: 0,
			transform: "translateY(-20px)",
		},
		"100%": {
			opacity: 1,
			transform: "translateY(0)",
		},
	},
});

export default function PostCard({ content }) {
	const classes = useStyles();

	return (
		<div className={classes.card}>
			<p className={classes.content}>{content}</p>
		</div>
	);
}
