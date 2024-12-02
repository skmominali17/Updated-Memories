import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const CreatePostBtn = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      sx={{
        border: "1px solid #ccc",
      }}
      onClick={() => navigate("/create-post")}
    >
      <AddIcon />
    </IconButton>
  );
};
export default CreatePostBtn;
