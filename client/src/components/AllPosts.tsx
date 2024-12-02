import Grid from "@mui/material/Grid";
import PostCard from "./PostCard";
import { useEffect } from "react";
import { getPosts } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../store/slices/postSlice";
import { Post } from "../interfaces/interfaces";

const AllPosts = () => {
  const postsObject = useSelector((state: any) => state.posts);
  console.log("redux post", postsObject.posts);
  const dispatch = useDispatch();

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
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {postsObject.posts.map((data: Post) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={12}
            key={data._id}
            sx={{
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              width: "60vw",
            }}
          >
            <PostCard data={data} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllPosts;
