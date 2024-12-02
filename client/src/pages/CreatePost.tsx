import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { createPost } from "../api/api";
import { useNavigate } from "react-router-dom";


type Inputs = {
  Title: string;
  Message: string;
  Tags: string;
  Image: FileList;
};

const CreatePost = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const file = data.Image[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result?.toString();

        const formData = {
          Title: data.Title,
          Message: data.Message,
          Tags: data.Tags,
          Image: base64String,
        };
        const response = await createPost(formData);
        console.log(response.data);
          
      };
      reader.readAsDataURL(file);
    }
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
        Create Your Post
      </Typography>
      <TextField
        {...register("Title", { required: true })}
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        error={Boolean(errors.Title)}
        helperText={errors.Title && "Title is required"}
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
        {...register("Message", { required: true })}
        label="Message"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        error={Boolean(errors.Message)}
        helperText={errors.Message && "Message is required"}
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
      <TextField
        {...register("Image")}
        type="file"
        label="Upload Image"
        variant="outlined"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          accept: "image/*", // Accept only image files
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
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreatePost;
