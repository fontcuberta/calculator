import React, { useState } from "react"
import Navigator from "../components/Navigator"
import Head from "next/head"
import { CssBaseline, Container, Divider, TextField } from "@material-ui/core"
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Button,
} from "@material-ui/core"
import { Slider, Typography } from "@material-ui/core"
import { FinancialPlanAndUser } from "../application/FinancialPlanService"
import { CompanyType, MeasureGoal, OnboardingType } from "../domain/CalculateTotalFinancialPlan"

const bindEventValueTo = (eventHandelerFn: any) => (event: any) =>
  eventHandelerFn(event.target.value)

const Home = () => {
  const [customerName, setCustomerName] = useState("")
  const [companyType, setCompanyType] = useState(CompanyType.MULTINATIONAL_CORPORATION)
  const [customerLastname, setCustomerLastname] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerCountry, setCustomerCountry] = useState("")
  const [numberOfOrganizations, setNumberOfOrganizations] = useState(1)
  const [numberOfProjects, setNumberOfProjects] = useState(1)
  const [measureGoal, setMeasureGoal] = useState(MeasureGoal.INSIGHTS_FINDING)
  const [onboardingType, setOnboardingType] = useState(OnboardingType.CUSTOMIZED)

  const marks = new Array(10)
    .fill(0)
    .map((_, i) => i + 1)
    .map(i => ({ value: i, label: i.toString() }))

  const handleSubmit = () => {
    const financialPlanAndUser: FinancialPlanAndUser = {
      impactMeasurementFinancialPlan: {
        companyType,
        measureGoal,
        numberOfOrganizations,
        numberOfProjects,
        onboardingType,
      },
      user: {
        country: customerCountry,
        email: customerEmail,
        firstname: customerName,
        lastname: customerLastname,
      },
    }

    fetch("/api/new-application", {
      method: "POST",
      body: JSON.stringify(financialPlanAndUser),
    })
  }

  return (
    <div>
      <Head>
        <title>Cuantix Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <React.Fragment>
        <Navigator />
        <CssBaseline />
        <Container maxWidth="md">
          <div className="hero">
            <h1 className="title">Cuantix Calculator</h1>
            <h2>
              ¡Hola! ¿Quieres saber cuánto podría costar tu medición? Contesta algunas preguntas y
              te enviaremos un presupuesto estimado.
            </h2>
            <form noValidate autoComplete="off">
              <h3>Háblanos un poco de tu empresa</h3>
              <div className="selector">
                <InputLabel>Tu empresa es...</InputLabel>
                <FormControl>
                  <Select
                    id="companyType"
                    value={companyType}
                    onChange={bindEventValueTo(setCompanyType)}
                  >
                    <MenuItem value={CompanyType.MULTINATIONAL_CORPORATION}>
                      Multinacional / Corporación
                    </MenuItem>
                    <MenuItem value={CompanyType.COMPANY}>Empresa</MenuItem>
                    <MenuItem value={CompanyType.NGO}>NGO</MenuItem>
                  </Select>
                  <FormHelperText>
                    Selecciona la opción que mejor describe a tu empresa
                  </FormHelperText>
                </FormControl>
              </div>
              <Divider />

              <h3>Cuéntanos sobre tu medición</h3>
              <div className="selector">
                <InputLabel>¿Cuál es el objetivo de la medición?</InputLabel>
                <FormControl>
                  <Select
                    id="measureGoal"
                    value={measureGoal}
                    onChange={bindEventValueTo(setMeasureGoal)}
                  >
                    <MenuItem value={MeasureGoal.PUBLIC_POLICY}>
                      Influir en políticas públicas
                    </MenuItem>
                    <MenuItem value={MeasureGoal.INVESTMENT_DECISION}>
                      Tomar decisiones de inversión
                    </MenuItem>
                    <MenuItem value={MeasureGoal.FUNDRAISING}>Levantar fondos</MenuItem>
                    <MenuItem value={MeasureGoal.REVENUE_ASSURANCE}>Demostrar el retorno</MenuItem>
                    <MenuItem value={MeasureGoal.INSIGHTS_FINDING}>
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
                  ¿Cuántas organizaciones intervienen en la creación y captura de datos del
                  proyecto?
                </InputLabel>
                <TextField
                  id="numberOfOrganizations"
                  label="Organizaciones"
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: 20 } }}
                  value={numberOfOrganizations}
                  onChange={event => {
                    const number = parseInt(event.target.value)
                    setNumberOfOrganizations(number)
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </div>
              <Typography id="slider" gutterBottom>
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
                onChange={(_event, newValue) => {
                  if (!Array.isArray(newValue)) {
                    setNumberOfProjects(newValue)
                  }
                }}
              />
              <div className="selector">
                <InputLabel>¿Cómo quieres hacer el onboarding?</InputLabel>
                <FormControl>
                  <Select
                    id="onboardingType"
                    value={onboardingType}
                    onChange={bindEventValueTo(setOnboardingType)}
                  >
                    <MenuItem value={OnboardingType.CUSTOMIZED}>Personalizado</MenuItem>
                    <MenuItem value={OnboardingType.THEORY_OF_CHANGE}>
                      Diseño Teoría de Cambio
                    </MenuItem>
                    <MenuItem value={OnboardingType.GROUP_WEBINAR}>Webinar Grupal</MenuItem>
                    <MenuItem value={OnboardingType.INDIVIDUAL_WEBINAR}>
                      Webinar Individual
                    </MenuItem>
                    <MenuItem value={OnboardingType.NO_ONBOARDING}>Sin Onboarding</MenuItem>
                  </Select>
                  <FormHelperText>
                    El proceso de onboarding con nuestros consultores te ayudara a conseguir la
                    mejor medición para tu proyecto
                  </FormHelperText>
                </FormControl>
              </div>
              <Divider />

              <h3>Finalmente, ¿cómo te contactamos?</h3>
              <TextField
                id="customerName"
                label="Nombre"
                value={customerName}
                onChange={bindEventValueTo(setCustomerName)}
                fullWidth
                required
                autoFocus
                margin="normal"
              />
              <TextField
                id="customerLastname"
                label="Apellido"
                value={customerLastname}
                onChange={bindEventValueTo(setCustomerLastname)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                id="customerEmail"
                label="Email"
                value={customerEmail}
                onChange={bindEventValueTo(setCustomerEmail)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                id="customerPhone"
                label="Número de Teléfono"
                value={customerPhone}
                onChange={bindEventValueTo(setCustomerPhone)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                id="customerCountry"
                label="País"
                value={customerCountry}
                onChange={bindEventValueTo(setCustomerCountry)}
                fullWidth
                margin="normal"
              />

              <Button className="button" onClick={handleSubmit}>
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
          color: #696969;
        }
        .title,
        .description {
          text-align: center;
        }
        .selector {
          margin-top: 20px;
          width: 100%;
        }
        #slider {
          margin-top: 210px;
        }
      `}</style>
    </div>
  )
}

export default Home
