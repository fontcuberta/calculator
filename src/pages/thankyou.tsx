import React from "react"
import Navigator from "../components/Navigator"
import Head from "next/head"
import { CssBaseline, Container, createMuiTheme, MuiThemeProvider } from "@material-ui/core"

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
          <Container maxWidth="sm">
            <div className="header">
              <h1>¡Muchas gracias por usar el Cotizador de Cuantix!</h1>
            </div>
            <h2>
              Estamos encantados de ayudarte a crear tu primer presupuesto. A continuación, revisa
              el correo electrónico que nos suministraste para verlo.
            </h2>
            <h5>
              Si necesitas ponerte en contacto con nosotros, por favor, envía un correo a{" "}
              <a href="mailto: giselle.gil@icuantix.com">giselle.gil@icuantix.com</a>
            </h5>
          </Container>
        </React.Fragment>

        <style jsx>{`
          .header {
            margin-top: 10%;
          }
          h1 {
            text-align: center;
          }
        `}</style>
      </MuiThemeProvider>
    </div>
  )
}

export default Thankyou
