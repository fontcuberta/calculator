import React, { useState } from "react"
import Navigator from "../components/Navigator"
import Head from "next/head"
import {
  CssBaseline,
  Container,
  TextField,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core"
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Button,
} from "@material-ui/core"

const THEME = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: "#F19809",
    },
    secondary: {
      main: "#9A1A18",
    },
  },
})

const Thankyou = () => {
  return (
    <div>
      <MuiThemeProvider theme={THEME}>
        <Head>
          <title>Cotizador Cuantix</title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <React.Fragment>
          <Navigator />
          <CssBaseline />
          <Container maxWidth="md">
            <h1>Thank you</h1>
          </Container>
        </React.Fragment>

        <style jsx>{``}</style>
      </MuiThemeProvider>
    </div>
  )
}

export default Thankyou
