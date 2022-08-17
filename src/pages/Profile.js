import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Avatar } from "@mui/material";
import newblog from "../assets/blok.png";
import Button from "@mui/material/Button";
import kendim from "../assets/kendim.jpeg";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Profile() {
  const [user, setUser] = useState([]);
  const [name, setName] = useState([]);

  const { currentUser } = useContext(AuthContext);

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
          marginTop={2}
          bgcolor="white"
          width={500}
          boxShadow={"10px 5px 5px gray"}
          borderRadius={"20px"}
        >
          <Avatar
            alt="Remy Sharp"
            src={newblog}
            style={{
              width: "220px",
              height: "220px",
              padding: "2rem",
              background: "#046582",
              marginTop: "1rem",
            }}
          />
          <Typography style={{ fontFamily: "Girassol", color: "#046582" }}>
            <h1>── My Profile ──</h1>
          </Typography>
          <Stack width={400} height={370} spacing={5}>
            <Typography variant="body2" component="span">
              <h2>Name: {currentUser?.displayName}</h2>
            </Typography>

            <Typography variant="body2" component="span">
              <h4>E-Mail: {currentUser?.email}</h4>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
