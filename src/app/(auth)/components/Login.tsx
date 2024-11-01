"use client";

import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { loginUser } from "@/api/authentication/api.auth";
import { useAuth } from "@/app/hooks/useAuth";

export default function Login() {
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const loginData = await loginUser({ email, password });
    login(loginData);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box component='form' noValidate={false} onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField required fullWidth id='email' label='Email Address' name='email' autoComplete='email' />
            </Grid>
            <Grid size={12}>
              <TextField required fullWidth name='password' label='Password' type='password' id='password' autoComplete='new-password' />
            </Grid>
          </Grid>
          <Button style={{ backgroundColor: "#7c66da", height: 50 }} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Grid container justifyContent='center'>
            <Grid>
              <Link href='/register' style={{ color: "blue" }}>
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
