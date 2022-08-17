import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import yeni6 from "../assets/yeni6.gif";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import { signOut } from "firebase/auth";
import { logout } from "../contexts/firebase"
import { warning, success } from "../contexts/toastNotify";



export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const profile = () => {
    navigate("/profile");
  };

  const newblog = () => {
    navigate("/newblog");
  };

const out = () => {
  logout();
  success("Successfully Logout");
  navigate("/login");
}

  const login = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/register");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: "#046582" }}>
        <Toolbar>
          <Link href="/">
            <img style={{ width: "85px"}} src={yeni6} alt="cw image" />
          </Link>

          <Typography
            align="center"
            style={{
              fontFamily: "Girassol",
              fontSize: "25px",
              fontWeight: 800,
            }}
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            <Link href="/" underline="none" color={"#F5DEB3"}>
              {"────< ENES >────"}
            </Link>
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {currentUser ? (
                  <Avatar>{currentUser?.email.slice(0,1)}</Avatar>
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
               {currentUser ? (
                <div onClick={handleClose}>
                <MenuItem onClick={profile}>Profile</MenuItem>
                <MenuItem onClick={newblog}>New</MenuItem>
                <MenuItem onClick={out}>LogOut</MenuItem>
                </div>
               ):(
                <div onClick={handleClose}>
                <MenuItem onClick={login}>LogIn</MenuItem>
                <MenuItem onClick={register}>Register</MenuItem>
                </div>
               )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
