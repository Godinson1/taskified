"use client";

import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth } from "@/app/hooks/useAuth";
import Container from "@mui/material/Container";
import { registerUser } from "@/api/authentication/api.auth";

export default function SignUp() {
  const { register } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registerInput = {
      username: data.get("username") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    await registerUser(registerInput);
    register();
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' noValidate={false} onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField required fullWidth name='username' label='Username' type='text' id='username' />
            </Grid>
            <Grid size={12}>
              <TextField required fullWidth name='email' label='Email Address' type='email' id='email' />
            </Grid>
            <Grid size={12}>
              <TextField required fullWidth name='password' label='Password' type='password' id='password' />
            </Grid>
          </Grid>
          <Button style={{ backgroundColor: "#7c66da", height: 50 }} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
          <Grid container justifyContent='center'>
            <Grid>
              <Link href='/login' style={{ color: "blue" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
