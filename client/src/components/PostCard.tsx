import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { deletePostById } from "../api/api";
// import { setAllPosts } from "../../store/slices/postSlice";
// import { useDispatch } from "react-redux";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard({data}: any) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditClick = () => {
    navigate(`/post/edit/${data._id}`)
  }

  const handleDeleteClick = async() => {
    try {
      const response = await deletePostById(data._id);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {`${data.creator[0]}${data.creator[1]}`}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleEditClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={data.creator}
        subheader={data.createdAt.toLocaleString().slice(0, 10)}
      />
      <CardMedia
        component="img"
        image={data.image}
        alt="Paella dish"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{data.message}</Typography>
        </CardContent>
      </Collapse>
      <Button onClick={handleDeleteClick} variant="contained">Delete</Button>
    </Card>
  );
}
