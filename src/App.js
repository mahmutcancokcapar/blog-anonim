import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { Button, Modal, TextField } from "@mui/material";
import PostCard from "./components/PostCard";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "#f0f0f0",
		flexDirection: "column",
		alignItems: "center",
		minHeight: "100vh",
		padding: "20px",
		display: "flex",
	},
	header: {
		width: "100%",
		padding: "20px",
		backgroundColor: "#222",
		color: "#fff",
		textAlign: "center",
		fontSize: "2rem",
		position: "sticky",
		top: 0,
		zIndex: 1,
	},
	newPostButton: {
		marginTop: "20px",
		backgroundColor: "#4CAF50",
		color: "#fff",
		fontSize: "1.2rem",
		padding: "10px 20px",
		"&:hover": {
			backgroundColor: "#45a049",
		},
		transition: "all 0.3s ease-in-out",
	},
	postList: {
		marginTop: "40px",
		width: "80%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	modalContent: {
		display: "flex",
		flexDirection: "column",
		padding: "20px",
		backgroundColor: "#fff",
		borderRadius: "10px",
		width: "400px",
		outline: "none",
		boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
	modalInput: {
		marginBottom: "20px",
	},
	submitButton: {
		backgroundColor: "#2196F3",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#0b7dda",
		},
	},
}));

export default function App() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// Gönderileri yükleme
	useEffect(() => {
		axios
			.get("http://localhost:5000/api/posts")
			.then((response) => {
				setPosts(response.data);
			})
			.catch((error) => {
				console.error("Veri yüklenirken bir hata oluştu:", error);
			});
	}, []);

	// Gönderi gönderme
	const handlePostSubmit = () => {
		axios
			.post("http://localhost:5000/api/posts", { content: newPost })
			.then((response) => {
				setPosts([...posts, response.data]);
				setNewPost("");
				handleClose();
			})
			.catch((error) => {
				console.error("Veri gönderirken bir hata oluştu:", error);
			});
	};

	return (
		<div className={classes.root}>
			<header className={classes.header}>Anonymus Blog</header>
			<Button className={classes.newPostButton} onClick={handleOpen}>
				Yeni Gönderi Ekle
			</Button>

			<div className={classes.postList}>
				{posts.map((post) => (
					<PostCard key={post.id} content={post.content} />
				))}
			</div>

			<Modal open={open} onClose={handleClose}>
				<div className={classes.modalContent}>
					<TextField
						label="Yeni Gönderi"
						variant="outlined"
						fullWidth
						className={classes.modalInput}
						value={newPost}
						onChange={(e) => setNewPost(e.target.value)}
					/>
					<Button
						className={classes.submitButton}
						onClick={handlePostSubmit}
						disabled={!newPost}
					>
						Paylaş
					</Button>
				</div>
			</Modal>
		</div>
	);
}
