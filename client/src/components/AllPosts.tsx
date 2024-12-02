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
      <Grid container spacing={2}>
        {postsObject.posts.map((data: Post) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            key={data._id}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "60vw",
              my: 1,
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
