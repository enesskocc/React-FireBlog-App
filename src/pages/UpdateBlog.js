import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Avatar } from "@mui/material";
import newblog from "../assets/blok.png";
import Button from "@mui/material/Button";
import { useState, useEffect, useContext } from "react";
import {
  set,
  ref,
  push,
  onValue,
  update,
  getDatabase,
} from "firebase/database";
import { AuthContext } from "../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
// import {db} from "../contexts/firebase"
import { warning, success } from "../contexts/toastNotify";

export default function UpdateBlog() {
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [content, setContent] = useState();
  const [user, setUser] = useState([]);

  const { currentUser, cards } = React.useContext(AuthContext);

  const date = new Date().toDateString();

  const { cardId } = useParams();

  const navigate = useNavigate();

  //! Update islemi icin yailmasi geren firebase kodlari!
  const writeNewBlog = () => {
    const db = getDatabase();
    const postData = {
      title: title,
      url: url,
      content: content,
      user: currentUser.email,
      date: date,
    };
    success("Successfully Updated");
    navigate("/");
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates["/card/" + cardId] = postData;
    return update(ref(db), updates);
  };

  //! read islemi icin! Yani; dataya gönderdigimiz verileri geri cagirmak icin firebasekodlari!
  useEffect(() => {
    cards?.map((card) =>
      card.id === cardId
        ? (setTitle(card.title), setUrl(card.url), setContent(card.content))
        : null
    );
  }, []);

  return (
    <Paper
      elevation={0}
      style={{ background: `url(https://picsum.photos/1600/900)` }}
    >
      <Stack direction="column" justifyContent="center" alignItems="center">
        {cards.map((card) =>
          card.id == cardId ? (
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
                src={url ? url : card.url}
                style={{
                  width: "220px",
                  height: "220px",
                  padding: "2rem",
                  background: "#046582",
                  marginTop: "1rem",
                }}
              />
              <Typography style={{ fontFamily: "Girassol", color: "#046582" }}>
                <h1>── Update Blog ──</h1>
              </Typography>
              <Stack width={400} height={480} spacing={5}>
                <TextField
                  fullWidth
                  label="Title*"
                  id="fullWidth"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="IMG URL*"
                  id="fullWidth"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Context*"
                  id="fullWidth"
                  minRows={7}
                  multiline
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <Button
                  sx={{
                    marginBottom: "1rem",
                    ":hover": { bgcolor: "#D5D5D5", color: "#046582" },
                  }}
                  variant="contained"
                  onClick={writeNewBlog}
                >
                  UPDATE
                </Button>
              </Stack>
            </Stack>
          ) : null
        )}
      </Stack>
    </Paper>
  );
}
