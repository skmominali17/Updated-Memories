import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { updatePostById } from "../api/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Inputs = {
  Title: string;
  Message: string;
  Tags: string;
};

const EditPost = () => {
  const postsObject = useSelector((state: any) => state.posts);
  const { id } = useParams<{ id: string }>();
  const currPost = postsObject.posts.find((post: any) => post._id === id);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await updatePostById(id, data);
    console.log(response.data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        borderRadius: 1,
        backgroundColor: "background.paper",
        boxShadow: 1,
        maxWidth: 500,
        margin: "auto",
        marginTop: 4,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Edit
      </Typography>
      <TextField
        defaultValue={currPost?.title}
        {...register("Title")}
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: errors.Title ? "error.main" : "text.primary",
            },
            "&:hover fieldset": {
              borderColor: errors.Title ? "error.main" : "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: errors.Title ? "error.main" : "primary.main",
            },
          },
        }}
      />
      <TextField
        defaultValue={currPost?.message}
        {...register("Message")}
        label="Message"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: errors.Message ? "error.main" : "text.primary",
            },
            "&:hover fieldset": {
              borderColor: errors.Message ? "error.main" : "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: errors.Message ? "error.main" : "primary.main",
            },
          },
        }}
      />
      <TextField
        defaultValue={currPost?.tags}
        {...register("Tags")}
        label="Tags"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "text.primary",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          marginTop: 2,
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
        // onClick={()=>navigate('/')}
      >
        Submit
      </Button>
    </Box>
  );
};

export default EditPost;
