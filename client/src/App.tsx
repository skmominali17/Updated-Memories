import Navbar from "./components/Navbar";
import SideNavbar from "./components/SideNavbar";
import { Grid, Box, CssBaseline } from "@mui/material";
import { red } from "@mui/material/colors";
import MobileBar from "./components/MobileBar";
import AllPosts from "./components/AllPosts";

function App() { 
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
            paddingBottom: { xs: "58px", md: 0 },
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
                py: 4
              }}
            >
              <AllPosts />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box display={{ xs: "block", md: "none" }}>
        <MobileBar />
      </Box>
    </Box>
  );
}

export default App;
