import { Box, MenuList, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import StickyButton from "./CreatePostBtn";

const SideNavbar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        left: 0,
        width: 120,
        height: "100vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          height: "80%",
          marginTop: 4,
          width: "80px",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ccc",
        }}
      >
        <Box
          component={MenuList}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            justifyContent: "center",
          }}
        >
          <IconButton sx={{ border: "1px solid #ccc" }}>
            <HomeIcon />
          </IconButton>
          <IconButton sx={{ border: "1px solid #ccc" }}>
            <AccountCircleIcon />
          </IconButton>
          <StickyButton />

          <IconButton sx={{ border: "1px solid #ccc" }}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SideNavbar;
