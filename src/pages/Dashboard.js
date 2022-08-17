import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth } from "../contexts/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  set,
  ref,
  push,
  onValue,
  update,
  getDatabase,
} from "firebase/database";
import { db } from "../contexts/firebase";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FiMessageSquare from "@mui/icons-material/Message";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { warning, success } from "../contexts/toastNotify";
import { AuthContext } from "../contexts/AuthContext";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Dashboard() {
  const [expanded, setExpanded] = React.useState(false);

  const [isLoading, setIsLoading] = useState();
  // const [cards, setCards] = useState([]);
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [content, setContent] = useState();
  const [user, setUser] = useState([]);

  const { currentUser, cards } = React.useContext(AuthContext);

  const navigate = useNavigate();

  // const [contacts, setContacts] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ margin: "5rem", color: "#046586" }}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Typography
            align="center"
            style={{
              fontFamily: "Girassol",
              fontSize: "25px",
              fontWeight: 800,
            }}
          >
            <h1>─── Dashboard ───</h1>
          </Typography>
          <Grid container spacing={2}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} s={6} md={4}>
                <Card
                  sx={{
                    Width: 345,
                    Height: 425,
                    borderBottom: "1px solid gray",
                    cursor: "pointer",
                  }}
                  onClick={(e) => navigate(`/details/${card.id}`)}
                >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140px"
                    image={card.url}
                  />
                  <CardContent
                    style={{
                      background: "#D9D9D9",
                      height: "125px",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      fontFamily="Girassol"
                      color="#046582"
                    >
                      {card.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {card.date}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textOverflow: "ellipsis" }}
                    >
                      {card.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <AccountCircle style={{ marginRight: "0.5rem" }} />
                    <p>{card.user} </p>
                  </CardActions>
                  <CardActions>
                    <Button size="small">
                      <FavoriteIcon />
                    </Button>
                    <Button size="small">
                      <FiMessageSquare />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>{" "}
        </div>
      )}
    </div>
  );
}
