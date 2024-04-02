import Grid from "@mui/material/Grid";
import PostCard from "../components/PostCard";
import { useEffect } from "react";
import { getPosts } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../store/slices/postSlice";
import { Post } from "../interfaces/interfaces";
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const postsObject = useSelector((state: any) => state.posts);
  console.log("redux post", postsObject.posts);
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        dispatch(setAllPosts(response.data));
      } catch (error) {}
    };
    fetchPosts();
  }, [dispatch]);

  return (
    <div>
    {/* <Button variant="contained" color="primary" onClick={() => navigate("/post/edit/:id")}>Edit Form</Button> */}
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {postsObject.posts.map((data: Post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={data._id}>
            <PostCard data={data} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllPosts;
