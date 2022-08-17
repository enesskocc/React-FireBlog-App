import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
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
import kendim from "../assets/kendim.jpeg";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import {
  set,
  ref,
  push,
  onValue,
  update,
  getDatabase,
  remove,
} from "firebase/database";
import { AuthContext } from "../contexts/AuthContext";
import { warning, success } from "../contexts/toastNotify";

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

export default function Details() {
  const [expanded, setExpanded] = React.useState(false);

  const [user, setUser] = useState([]);

  const { currentUser, cards } = useContext(AuthContext);

  //! AppRouter'da cardId diye yazdigimizi buraya yaziyoruz.
  const { cardId } = useParams();
  const navigate = useNavigate();

  //! Yukaridaki CardId'i bu sekilde ögrendim!
  // const params = useParams()
  // console.log({params});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //! Silme islemi icin!
  const deleteCard = (id) => {
    const db = getDatabase();
    remove(ref(db, "card/" + id));
    success("Successfully Deleted");
    navigate("/");
  };

  return (
    <div>
      {cards.map((card) =>
        card.id === cardId ? (
          <Stack
            key={card.id}
            marginTop={4}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              marginTop={5}
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              padding={4}
              width={1000}
              bgcolor="white"
              borderRadius={3}
            >
              <Typography
                component={"span"}
                variant="body1"
                style={{
                  color: "#046582",
                  fontFamily: "Girassol",
                  fontSize: "1.5 rem",
                }}
              >
                <h1>─── Details ───</h1>
              </Typography>
              <Card
                sx={{
                  Width: 750,
                  height: 550,
                  borderBottom: "1px solid gray",
                  cursor: "pointer",
                }}
              >
                <CardMedia
                  component="img"
                  height="370px"
                  image={card.url}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    bgcolor="#E7E6F5"
                  >
                    {card.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <AccountCircleIcon style={{ marginRight: "0.5rem" }} />{" "}
                  <p>{card.user}</p>
                </CardActions>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>

              {card.user === currentUser.email ? (
                <Stack
                  marginTop={2}
                  marginBottom={2}
                  display="flex"
                  justifyContent="center"
                  spacing={20}
                  direction="row"
                >
                  <Button
                    fullWidth
                    sx={{
                      ":hover": { bgcolor: "#D5D5D5", color: "#046582" },
                    }}
                    variant="contained"
                    onClick={(e) => navigate(`/update/${card.id}`)}
                  >
                    UPDATE
                  </Button>
                  <Button
                    fullWidth
                    sx={{
                      ":hover": { bgcolor: "red", color: "#046582" },
                    }}
                    variant="contained"
                    onClick={() => deleteCard(card.id)}
                  >
                    DELETE
                  </Button>
                </Stack>
              ) : null}
            </Stack>
          </Stack>
        ) : null
      )}
    </div>
  );
}
