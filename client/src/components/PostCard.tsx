import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { grey, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { deletePostById } from "../api/api";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";

export default function PostCard({ data }: any) {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleEditClick = () => {
		navigate(`/post/edit/${data._id}`);
	};

	const handleDeleteClick = async () => {
		try {
			const response = await deletePostById(data._id);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleMenuClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<Card
			sx={{
				width: { xs: "100vw", sm: "60vw" },
				mx: { xs: 1, sm: 0 },
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mx: { xs: 2, sm: 4 },
				}}
			>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
							{/* {`${data.creator[0]}${data.creator[1]}`} */}
						</Avatar>
					}
					title='Hardcode'
					subheader={data.createdAt.toLocaleString().slice(0, 10)}
				/>
				<Box>
					<IconButton
						aria-label='settings'
						aria-controls={open ? "menu-options" : undefined}
						aria-haspopup='true'
						aria-expanded={open ? "true" : undefined}
						onClick={handleMenuClick}
					>
						<MoreVertIcon />
					</IconButton>
					<Menu
						id='menu-options'
						anchorEl={anchorEl}
						open={open}
						onClose={handleMenuClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
					>
						<MenuItem
							onClick={() => {
								handleEditClick();
								handleMenuClose();
							}}
						>
							<ListItemIcon>
								<EditIcon fontSize='small' />
							</ListItemIcon>
							<ListItemText>Edit</ListItemText>
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleDeleteClick();
								handleMenuClose();
							}}
						>
							<ListItemIcon>
								<DeleteIcon fontSize='small' />
							</ListItemIcon>
							<ListItemText>Delete</ListItemText>
						</MenuItem>
					</Menu>
				</Box>
			</Box>
			<Divider />
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					justifyContent: "space-between",
					px: 4,
					py: 2,
				}}
			>
				<Box
					sx={{
						width: { xs: "100%", lg: "30vw" },
						height: { xs: "50vh", lg: "60vh" },
					}}
				>
					<CardMedia
						component='img'
						image={data.image}
						alt='Paella dish'
						sx={{
							width: "100%",
							height: "100%",
							objectFit: "contain",
							backgroundColor: grey[100],
						}}
					/>
				</Box>

				<Box
					sx={{
						width: { xs: "100%", lg: "30vw" },
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<Box>
						<CardContent>
							<Typography variant='h5'>{data.title}</Typography>
							<Typography
								variant='body2'
								color='text.secondary'
								sx={{ lineHeight: 2 }}
							>
								{data.message}
							</Typography>
						</CardContent>
					</Box>
					<CardActions sx={{ display: "flex", justifyContent: "end" }}>
						<IconButton aria-label='like'>
							<FavoriteIcon />
						</IconButton>
						<IconButton aria-label='share'>
							<ShareIcon />
						</IconButton>
					</CardActions>
				</Box>
			</Box>
		</Card>
	);
}
