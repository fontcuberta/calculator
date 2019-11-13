import React, { useState } from 'react'
import Head from 'next/head'
import { CssBaseline, Container, Divider, TextField } from "@material-ui/core";
import { InputLabel, MenuItem, FormHelperText, FormControl, Select, Button } from "@material-ui/core";
import { Slider, Typography } from "@material-ui/core";

const Home = () => {
  const [customerName, setCustomerName] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [customerLastname, setCustomerLastname] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerCountry, setCustomerCountry] = useState('')
  const [numberOfOrganizations, setNumberOfOrganizations] = useState('')
  const [numberOfProjects, setNumberOfProjects] = useState(1)
  const [measureGoal, setMeasureGoal] = useState('')
  const [onboardingType, setOnboardingType] = useState('')

  const marks = new Array(10)
    .fill(0)
    .map((_, i) => i + 1)
    .map(i => ({ value: i, label: i.toString() }))

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target)

    fetch('http://localhost:3000/api/new-application', {
      method: 'POST',
      body: JSON.stringify({
        payload: "Tus Vainas"
      })
    })
  };

  return (
    <div>
      <Head>
        <title>Cuantix Calculator</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <div className='hero'>
          <h1 className='title'>Cuantix Calculator!</h1>
          <h2>¡Hola! ¿Quieres saber cuánto podría costar tu medición? Contesta algunas preguntas y te enviaremos un presupuesto estimado.</h2>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <h3>Háblanos un poco de tu empresa</h3>
            <div className ="selector">
              <InputLabel>
                  Tu empresa es...
              </InputLabel>
              <FormControl>
                <Select
                  id="companyType"
                  value={companyType}
                  onChange={setCompanyType}
                >
                  <MenuItem value="Multinacional / Corporación">
                    Multinacional / Corporación
                  </MenuItem>
                  <MenuItem value="Empresa">
                    Empresa
                  </MenuItem>
                  <MenuItem value="NGO">
                    NGO
                  </MenuItem>
                </Select>
                <FormHelperText>
                  Selecciona la opción que mejor describe a tu empresa
                </FormHelperText>
              </FormControl>
            </div>
            <Divider />

            <h3>Cuéntanos sobre tu medición</h3>
            <div className ="selector">
              <InputLabel>
                  ¿Cuál es el objetivo de la medición?
              </InputLabel>
              <FormControl>
                <Select
                  id="measureGoal"
                  value={measureGoal}
                  onChange={setMeasureGoal}
                >
                  <MenuItem value="Influir en políticas públicas">
                    Influir en políticas públicas
                  </MenuItem>
                  <MenuItem value="Tomar decisiones de inversión">
                    Tomar decisiones de inversión
                  </MenuItem>
                  <MenuItem value="Levantar fondos">
                    Levantar fondos
                  </MenuItem>
                  <MenuItem value="Demostrar el retorno">
                    Demostrar el retorno
                  </MenuItem>
                  <MenuItem value="Conocer insights o necesidades">
                    Conocer insights o necesidades
                  </MenuItem>
                </Select>
                <FormHelperText>
                  Escoge el objetivo principal por el que quieres medir
                </FormHelperText>
              </FormControl>
            </div>
            <div className="selector">
              <InputLabel>
                ¿Cuántas organizaciones intervienen en la creación y captura de datos del proyecto?
                </InputLabel>
              <FormControl>
                <Select
                  id="numberOfOrganizations"
                  value={numberOfOrganizations}
                  onChange={setNumberOfOrganizations}
                >
                  <MenuItem value="Solo una (organización ejecutora)">
                    Solo una (organización ejecutora)
                  </MenuItem>
                  <MenuItem value="De 2 a 4">
                    De 2 a 4
                  </MenuItem>
                  <MenuItem value="5 a 10">
                    5 a 10
                  </MenuItem>
                  <MenuItem value="10 a 20">
                    10 a 20
                  </MenuItem>
                  <MenuItem value="Más de 20">
                    Más de 20
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <Typography id="discrete-slider-always" gutterBottom>
              ¿Cuántos proyectos quieres medir?
            </Typography>
            <Slider
              value={numberOfProjects}
              defaultValue={1}
              step={1}
              min={1}
              max={10}
              marks={marks}
              valueLabelDisplay="on"
            />
            <div className ="selector">
              <InputLabel>
                  ¿Cómo quieres hacer el onboarding?
              </InputLabel>
              <FormControl>
                <Select
                  id="onboardingType"
                  value={onboardingType}
                  onChange={setOnboardingType}
                >
                  <MenuItem value="Personalizado">
                    Personalizado
                  </MenuItem>
                  <MenuItem value="Diseño Teoría de Cambio">
                    Diseño Teoría de Cambio
                  </MenuItem>
                  <MenuItem value="Webinar Grupal">
                    Webinar Grupal
                  </MenuItem>
                  <MenuItem value="Webinar Individual">
                    Webinar Individual
                  </MenuItem>
                  <MenuItem value="Sin Onboarding">
                    Sin Onboarding
                  </MenuItem>
                </Select>
                <FormHelperText>
                  El proceso de onboarding con nuestros consultores te ayudara a conseguir la mejor medición para tu proyecto
                </FormHelperText>
              </FormControl>
            </div>
            <Divider/>

            <h3>Finalmente, ¿cómo te contactamos?</h3>
            <TextField
              id="customerName"
              label="Nombre"
              value={customerName}
              onChange={e => setCustomerName(e.target.value) }
              fullWidth
              required
              autoFocus
              margin="normal"
            />
            <TextField
              id="customerLastname"
              label="Apellido"
              value={customerLastname}
              onChange={e => setCustomerLastname(e.target.value) }
              fullWidth
              required
              margin="normal"
            />
            <TextField
              id="customerEmail"
              label="Email"
              value={customerEmail}
              onChange={setCustomerEmail}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              id="customerPhone"
              label="Número de Teléfono"
              value={customerPhone}
              onChange={setCustomerPhone}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              id="customerCountry"
              label="País"
              value={customerCountry}
              onChange={setCustomerCountry}
              fullWidth
              margin="normal"
            />

            <Button
              className="button"
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </form>
        </div>
      </Container>
    </React.Fragment>


      <style jsx>{`
        .button {
          width: 100% !important;
          color: red !important;
          border: 1px solid #9b9b9b;
          background-color: #230000;
        }
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
        .selector {
          margin-top: 20px;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default Home
