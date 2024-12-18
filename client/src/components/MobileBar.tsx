import { Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import CreatePostBtn from "./CreatePostBtn";

const MobileBar = () => {
	return (
		<Box
			sx={{
				position: "fixed",
				bottom: 0,
				left: 0,
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				padding: "8px",
				backgroundColor: "#f0f0f0",
				borderTop: "1px solid #ccc",
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "center", gap: 6 }}>
				<IconButton sx={{ border: "1px solid #ccc" }}>
					<HomeIcon fontSize='medium' />
				</IconButton>
				<IconButton sx={{ border: "1px solid #ccc" }}>
					<AccountCircleIcon fontSize='medium' />
				</IconButton>

				<CreatePostBtn />
				<IconButton sx={{ border: "1px solid #ccc" }}>
					<LogoutIcon fontSize='medium' />
				</IconButton>
			</Box>
		</Box>
	);
};

export default MobileBar;
