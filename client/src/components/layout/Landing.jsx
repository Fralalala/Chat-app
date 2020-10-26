import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

const Landing = () => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  return (
    <div>
      <Container maxWidth="xs">
        <Paper elevation={3} className="landing-page">
          <Avatar />
          <h1>Discussion App</h1>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="room"
            label="Room Name"
            name="room"
            autoFocus
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          {/* <FormControlLabel
          className="checkbox"
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
          <Link
            to={{
              pathname: `/${room}`,
              state: { name },
            }}
          >
            <Button variant="contained" fullWidth id="signInBtn">
              Sign in
            </Button>
          </Link>
        </Paper>
      </Container>
    </div>
  );
};

export default Landing;
