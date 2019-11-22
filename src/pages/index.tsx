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
import { Slider, Typography } from "@material-ui/core"
import { FinancialPlanAndUser } from "../application/FinancialPlanService"
import { CompanyType, MeasureGoal, OnboardingType } from "../domain/CalculateTotalFinancialPlan"

const bindEventValueTo = (eventHandelerFn: any) => (event: any) =>
  eventHandelerFn(event.target.value)

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

const Home = () => {
  const [customerName, setCustomerName] = useState("")
  const [companyType, setCompanyType] = useState(CompanyType.MULTINATIONAL_CORPORATION)
  const [customerLastname, setCustomerLastname] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerCountry, setCustomerCountry] = useState("")
  const [numberOfOrganizations, setNumberOfOrganizations] = useState(1)
  const [numberOfProjects, setNumberOfProjects] = useState(1)
  const [numberOfEbookReports, setNumberOfEbookReports] = useState(1)
  const [numberOfPDFReports, setNumberOfPDFReports] = useState(1)
  const [numberOfReadableReports, setNumberOfReadableReports] = useState(1)
  const [numberOfExecutiveReports, setNumberOfExecutiveReports] = useState(1)
  const [numberOfOnePagerReports, setNumberOfOnePagerReports] = useState(1)
  const [numberOfDashboardReports, setNumberOfDashboardReports] = useState(1)
  const [measureGoal, setMeasureGoal] = useState(MeasureGoal.INSIGHTS_FINDING)
  const [onboardingType, setOnboardingType] = useState(OnboardingType.NO_ONBOARDING)

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
        numberOfEbookReports,
        numberOfPDFReports,
        numberOfReadableReports,
        numberOfExecutiveReports,
        numberOfOnePagerReports,
        numberOfDashboardReports,
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
    alert("This is done") // TODO: Add proper routing here
    console.log("Fetched to the backend") // TODO: Add proper routing here
  }

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
            <div className="hero">
              <h1 className="title">Cotizador Cuantix</h1>
              <h2>
                ¿Quieres saber cuánto podría costar tu medición? Contesta algunas preguntas y te
                enviaremos un presupuesto estimado.
              </h2>
              <form noValidate autoComplete="off">
                <div className="survey-section">
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
                </div>

                <div className="survey-section">
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
                        <MenuItem value={MeasureGoal.REVENUE_ASSURANCE}>
                          Demostrar el retorno
                        </MenuItem>
                        <MenuItem value={MeasureGoal.ACCOUNTABILITY}>Rendición de cuentas</MenuItem>
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
                  <Typography gutterBottom>¿Cuántos proyectos quieres medir?</Typography>
                  <div className="slider">
                    <Slider
                      value={numberOfProjects}
                      color="primary"
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
                  </div>
                  <div className="selector">
                    <InputLabel>¿Cómo quieres hacer el onboarding?</InputLabel>
                    <FormControl>
                      <Select
                        id="onboardingType"
                        value={onboardingType}
                        onChange={bindEventValueTo(setOnboardingType)}
                      >
                        <MenuItem value={OnboardingType.NO_ONBOARDING}>Sin Onboarding</MenuItem>
                        <MenuItem value={OnboardingType.THEORY_OF_CHANGE}>
                          Diseño Teoría de Cambio
                        </MenuItem>
                        <MenuItem value={OnboardingType.GROUP_WEBINAR}>
                          Webinar Grupal - Trabajarás con otras empresas creando tu medición
                        </MenuItem>
                        <MenuItem value={OnboardingType.INDIVIDUAL_WEBINAR}>
                          Webinar Individual
                        </MenuItem>
                        <MenuItem value={OnboardingType.CUSTOMIZED}>
                          Personalizado - Un consultor dedicado para tus necesidades
                        </MenuItem>
                      </Select>
                      <FormHelperText>
                        El proceso de onboarding con nuestros consultores te ayudara a conseguir la
                        mejor medición para tu proyecto
                      </FormHelperText>
                    </FormControl>
                  </div>
                </div>

                <div className="survey-section">
                  <h3>¿Cómo quieres recibir tus reportes y cuántos al año? </h3>
                  <div className="selector">
                    <InputLabel>
                      Informe externo con diseño - Formato ebook con manual de marca para descarga
                      en linea
                    </InputLabel>
                    <TextField
                      id="numberofEbookReports"
                      type="number"
                      InputProps={{ inputProps: { min: 1, max: 20 } }}
                      value={numberOfEbookReports}
                      onChange={event => {
                        const number = parseInt(event.target.value)
                        setNumberOfEbookReports(number)
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </div>
                  <div className="selector">
                    <InputLabel>
                      Informe interno detallado - Formato PDF entre 20 y 50 paginas
                    </InputLabel>
                    <TextField
                      id="numberOfPDFReports"
                      type="number"
                      InputProps={{ inputProps: { min: 1, max: 20 } }}
                      value={numberOfPDFReports}
                      onChange={event => {
                        const number = parseInt(event.target.value)
                        setNumberOfPDFReports(number)
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </div>
                  <div className="selector">
                    <InputLabel>
                      Reporte de impacto para lectura - Presentación en formato lectura
                    </InputLabel>
                    <TextField
                      id="numberOfReadableReports"
                      type="number"
                      InputProps={{ inputProps: { min: 1, max: 20 } }}
                      value={numberOfReadableReports}
                      onChange={event => {
                        const number = parseInt(event.target.value)
                        setNumberOfReadableReports(number)
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </div>
                  <div className="selector">
                    <InputLabel>
                      Reporte de impacto para presentación ejecutiva - Infografia en formato
                      presentación
                    </InputLabel>
                    <TextField
                      id="numberOfExecutiveReports"
                      type="number"
                      InputProps={{ inputProps: { min: 1, max: 20 } }}
                      value={numberOfExecutiveReports}
                      onChange={event => {
                        const number = parseInt(event.target.value)
                        setNumberOfExecutiveReports(number)
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </div>
                  <div className="selector">
                    <InputLabel>
                      Resumen ejecutivo - One pager con los principales hallazgos y recomendaciones
                    </InputLabel>
                    <TextField
                      id="numberOfOnePagerReports"
                      type="number"
                      InputProps={{ inputProps: { min: 1, max: 20 } }}
                      value={numberOfOnePagerReports}
                      onChange={event => {
                        const number = parseInt(event.target.value)
                        setNumberOfOnePagerReports(number)
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </div>
                  <div className="selector">
                    <InputLabel>
                      Dashboard de indicadores online - Dashboard interactivo y personalizado por
                      proyecto
                    </InputLabel>
                    <TextField
                      id="numberOfDashboardReports"
                      type="number"
                      InputProps={{ inputProps: { min: 1, max: 20 } }}
                      value={numberOfDashboardReports}
                      onChange={event => {
                        const number = parseInt(event.target.value)
                        setNumberOfDashboardReports(number)
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </div>
                </div>

                <div className="survey-section">
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
                </div>
                <div className="button-div">
                  <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    SOLICITAR PRESUPUESTO
                  </Button>
                </div>
              </form>
            </div>
          </Container>
        </React.Fragment>

        <style jsx>{`
          .survey-section {
            padding: 5% 5%;
            background-color: #e0dede;
            margin: 1%;
            border-radius: 1%;
          }
          .button-div {
            margin: 7% 0;
            text-align: center;
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
          .slider {
            margin-top: 8%;
          }
        `}</style>
      </MuiThemeProvider>
    </div>
  )
}

export default Home
