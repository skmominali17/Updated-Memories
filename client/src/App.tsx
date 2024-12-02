import Navbar from "./components/Navbar";
import SideNavbar from "./components/SideNavbar";
import Footer from "./components/Footer";
import { Grid, Box, CssBaseline } from "@mui/material";
import { red } from "@mui/material/colors";
import MobileBar from "./components/MobileBar";
import AllPosts from "./components/AllPosts";
import StickyButton from "./components/CreatePostBtn";
function App() {
  const isAuthenticated = () => !!localStorage.getItem("authToken");
  const print = () => {
    if (isAuthenticated()) console.log("logged in!");
    else {
      console.log("logged out");
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Navbar />
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: 7 }}>
        <Box display={{ xs: "none", md: "block" }}>
          <SideNavbar />
        </Box>
        <Grid
          container
          sx={{
            flexGrow: 1,
            height: "auto",
            marginLeft: { md: "120px" },
            width: { xs: "100%", md: "calc(100vw - 120px)" },
          }}
        >
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundColor: red[500],
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Box> Here we will render all post component </Box> */}
              {/* <StickyButton/> */}
              <AllPosts />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box display={{ xs: "none", md: "block" }}>{/* <Footer /> */}</Box>
      <Box display={{ xs: "block", md: "none" }}>
        <MobileBar />
      </Box>
    </Box>
  );
}

export default App;
