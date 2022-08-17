import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Avatar } from "@mui/material";
import newblok from "../assets/blok.png";
import Button from "@mui/material/Button";
import {
  set,
  ref,
  push,
  onValue,
  update,
  getDatabase,
} from "firebase/database";
import { auth } from "../contexts/firebase";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { warning, success } from "../contexts/toastNotify";

export default function NewBlog() {
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [content, setContent] = useState();
  const [user, setUser] = useState([]);
  const [cards, setCards] = useState([]);

  const { currentUser } = React.useContext(AuthContext);

  const date = new Date().toDateString();

  const navigate = useNavigate();

  console.log(currentUser);

  //! Database'e ekleme yapmak icin!
  const newblog = () => {
    const db = getDatabase();
    const userRef = ref(db, "card");
    const newUserRef = push(userRef);
    set(newUserRef, {
      title: title,
      url: url,
      content: content,
      user: currentUser.email,
      date: date,
    });
    success("Successfully Added ");
    setTitle("");
    setUrl("");
    setContent("");
    setUser("");
    navigate("/");
  };

  // console.log(cards);

  return (
    <Paper
      elevation={0}
      style={{ background: `url(https://picsum.photos/1600/900)` }}
    >
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          marginTop={8}
          bgcolor="white"
          width={500}
          boxShadow={"10px 5px 5px gray"}
          borderRadius={"20px"}
        >
          <Avatar
            alt="Remy Sharp"
            style={{
              width: "220px",
              height: "220px",
              padding: "2rem",
              background: "#046582",
              marginTop: "1rem",
            }}
          >
            <img src={newblok} alt="" />
          </Avatar>

          <Typography style={{ fontFamily: "Girassol", color: "#046582" }}>
            <h1>── New Blog ──</h1>
          </Typography>
          <Stack width={400} height={480} spacing={5}>
            <TextField
              fullWidth
              label="Title*"
              id="fullWidth"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              fullWidth
              label="IMG URL*"
              id="fullWidth"
              onChange={(e) => setUrl(e.target.value)}
            />
            <TextField
              fullWidth
              label="Content*"
              id="fullWidth"
              minRows={7}
              multiline
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              sx={{
                marginBottom: "1rem",
                ":hover": { bgcolor: "#D5D5D5", color: "#046582" },
              }}
              variant="contained"
              onClick={newblog}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
