import React, { useState } from "react"
import Router from "next/router"
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
import {
  CompanyType,
  CompanyDescription,
  MeasureGoal,
  DataCollectionType,
  OnboardingType,
  OnboardingDescription,
  CustomerCountry,
} from "../domain/CalculateTotalFinancialPlan"

let companyInfo = CompanyDescription.MULTINATIONAL
let onboardingInfo = OnboardingDescription.NO_ONBOARDING

const bindEventValueTo = (eventHandelerFn: any) => (event: any) => {
  eventHandelerFn(event.target.value)
  updateCompanyInfo(event.target.value)
  updateOnboardingInfo(event.target.value)
}

const updateCompanyInfo = (eventValue: any) => {
  if (eventValue === CompanyType.NGO) {
    companyInfo = CompanyDescription.NGO
  }
  if (eventValue === CompanyType.MULTINATIONAL_CORPORATION) {
    companyInfo = CompanyDescription.MULTINATIONAL
  }
  if (eventValue === CompanyType.COMPANY) {
    companyInfo = CompanyDescription.COMPANY
  }
}

const updateOnboardingInfo = (eventValue: any) => {
  if (eventValue === OnboardingType.NO_ONBOARDING) {
    onboardingInfo = OnboardingDescription.NO_ONBOARDING
  }
  if (eventValue === OnboardingType.THEORY_OF_CHANGE) {
    onboardingInfo = OnboardingDescription.THEORY_OF_CHANGE
  }
  if (eventValue === OnboardingType.GROUP_WEBINAR) {
    onboardingInfo = OnboardingDescription.GROUP_WEBINAR
  }
  if (eventValue === OnboardingType.INDIVIDUAL_WEBINAR) {
    onboardingInfo = OnboardingDescription.INDIVIDUAL_WEBINAR
  }
  if (eventValue === OnboardingType.CUSTOMIZED) {
    onboardingInfo = OnboardingDescription.CUSTOMIZED
  }
}

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
  const [numberOfOrganizations, setNumberOfOrganizations] = useState(0)
  const [numberOfProjects, setNumberOfProjects] = useState(0)
  const [numberOfBeneficiaries, setNumberOfBeneficiaries] = useState(0)
  const [dataCollectionType, setDataCollectionType] = useState(DataCollectionType.WHATSAPP)
  const [numberOfEbookReports, setNumberOfEbookReports] = useState(0)
  const [numberOfPDFReports, setNumberOfPDFReports] = useState(0)
  const [numberOfReadableReports, setNumberOfReadableReports] = useState(0)
  const [numberOfExecutiveReports, setNumberOfExecutiveReports] = useState(0)
  const [numberOfOnePagerReports, setNumberOfOnePagerReports] = useState(0)
  const [numberOfDashboardReports, setNumberOfDashboardReports] = useState(0)
  const [measureGoal, setMeasureGoal] = useState(MeasureGoal.INSIGHTS_FINDING)
  const [onboardingType, setOnboardingType] = useState(OnboardingType.NO_ONBOARDING)

  const marks = new Array(10)
    .fill(0)
    .map((_, i) => i + 1)
    .map(i => ({ value: i, label: i.toString() }))

  const marksBeneficiaries = new Array(11)
    .fill(0)
    .map((_, i) => i * 100)
    .slice(1)
    .map(i => ({ value: i, label: i.toString() }))

  const handleSubmit = () => {
    const financialPlanAndUser: FinancialPlanAndUser = {
      impactMeasurementFinancialPlan: {
        companyType,
        measureGoal,
        numberOfOrganizations,
        numberOfProjects,
        numberOfBeneficiaries,
        dataCollectionType,
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
    Router.push("/thankyou")
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
                  <div className="section-title">
                    <img src="icons/company.svg" />
                    <h2>Cuéntanos un poco sobre tu organización, ¿cómo la defines?</h2>
                  </div>
                  <div className="question">
                    <div className="selector-with-info">
                      <InputLabel>Tu empresa es...</InputLabel>
                      <FormControl fullWidth>
                        <Select
                          fullWidth
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
                    <div className="info-section">
                      <p>{companyInfo}</p>
                    </div>
                  </div>
                </div>

                <div className="survey-section">
                  <div className="section-title">
                    <img src="icons/measurement.svg" />
                    <h2>
                      Queremos conocer cómo tienes pensada tu medición de acuerdo a tu proyecto
                    </h2>
                  </div>
                  <div className="selector">
                    <InputLabel className="input-label">
                      ¿Con qué objetivo quieres realizar la medición?
                    </InputLabel>
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
                    <InputLabel className="input-label">
                      ¿Cuántas organizaciones intervienen en la creación y captura de datos del
                      proyecto?
                    </InputLabel>
                    <FormControl>
                      <TextField
                        id="numberOfOrganizations"
                        type="number"
                        fullWidth
                        InputProps={{ inputProps: { min: 1, max: 20 } }}
                        value={numberOfOrganizations}
                        onChange={event => {
                          const number = parseInt(event.target.value)
                          setNumberOfOrganizations(number)
                        }}
                        margin="normal"
                      />
                    </FormControl>
                  </div>
                  <InputLabel className="input-label">¿Cuántos proyectos quieres medir?</InputLabel>
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
                  <div className="question">
                    <div className="selector-with-info">
                      <InputLabel>
                        Ofrecemos diferentes métodos para hacer el diseño de tu medición, unos más
                        personalizados que otros, ¿cuál te gustaría?
                      </InputLabel>
                      <FormControl>
                        <Select
                          id="onboardingType"
                          value={onboardingType}
                          onChange={bindEventValueTo(setOnboardingType)}
                        >
                          <MenuItem value={OnboardingType.NO_ONBOARDING}>
                            Sin Diseño de Medición
                          </MenuItem>
                          <MenuItem value={OnboardingType.THEORY_OF_CHANGE}>
                            Diseño de Teoría del Cambio
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
                          El proceso de onboarding con nuestros consultores te ayudara a conseguir
                          la mejor medición para tu proyecto
                        </FormHelperText>
                      </FormControl>
                    </div>
                    <div className="info-section">
                      <p>{onboardingInfo}</p>
                    </div>
                  </div>
                </div>
                <div className="survey-section">
                  <div className="section-title">
                    <img src="icons/social-impact.svg" />
                    <h2>
                      Necesitamos saber el alcance de tus proyectos de impacto para ayudarte a
                      levantar información
                    </h2>
                  </div>
                  <div className="selector">
                    <InputLabel>
                      ¿Cuántos beneficiarios tiene tu proyecto aproximadamente?
                    </InputLabel>
                    <TextField
                      id="numberOfBeneficiaries"
                      type="number"
                      InputProps={{ inputProps: { min: 1, max: 10000000 } }}
                      value={numberOfBeneficiaries}
                      onChange={event => {
                        const number = parseInt(event.target.value)
                        setNumberOfBeneficiaries(number)
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </div>
                  <div className="selector">
                    <InputLabel>
                      ¿Dirías que tus beneficiarios pertenecen a cuál de estas categorías?
                    </InputLabel>
                    <FormControl>
                      <Select
                        id="dataCollectionType"
                        value={dataCollectionType}
                        onChange={bindEventValueTo(setDataCollectionType)}
                      >
                        <MenuItem value={DataCollectionType.WHATSAPP}>
                          Mis beneficiarios tienen más de 15 años y poseen acceso a un teléfono
                          inteligente
                        </MenuItem>
                        <MenuItem value={DataCollectionType.CALL}>
                          Mis beneficiarios tienen más de 15 años, NO poseen acceso a tecnología y
                          no tengo contacto en persona con ellos
                        </MenuItem>
                        <MenuItem value={DataCollectionType.OFFLINE}>
                          Tengo contacto en persona con mis beneficiarios y puedo levantar
                          información en campo, o son jóvenes o niños y debo levantar información en
                          papel
                        </MenuItem>
                      </Select>
                      <FormHelperText>
                        Con esto determinamos la mejor forma de hacer el levantamiento de datos
                      </FormHelperText>
                    </FormControl>
                  </div>
                </div>

                <div className="survey-section">
                  <div className="section-title">
                    <img src="icons/reporting.svg" />
                    <h2>
                      Poseemos distintos tipos de reportes, los cuales puedes escoger a tu
                      conveniencia según tus necesidades. ¿Cuáles y cuántos crees que te podrían
                      ayudar a lograr tus metas?
                    </h2>
                  </div>
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
                  <div className="section-title">
                    <img src="icons/sending.svg" />
                    <h2>Finalmente, ¿a dónde te gustaría que enviaramos tu presupuesto?</h2>
                  </div>
                  <FormControl fullWidth>
                    <TextField
                      id="customerName"
                      fullWidth
                      label="Nombre"
                      value={customerName}
                      onChange={bindEventValueTo(setCustomerName)}
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
                    <div className="selector">
                      <FormControl fullWidth>
                        <InputLabel>País</InputLabel>
                        <Select
                          fullWidth
                          id="country"
                          value={customerCountry}
                          onChange={bindEventValueTo(setCustomerCountry)}
                        >
                          <MenuItem value={CustomerCountry.ARGENTINA}>Argentina</MenuItem>
                          <MenuItem value={CustomerCountry.BOLIVIA}>Bolivia</MenuItem>
                          <MenuItem value={CustomerCountry.BRASIL}>Brasil</MenuItem>
                          <MenuItem value={CustomerCountry.COLOMBIA}>Colombia</MenuItem>
                          <MenuItem value={CustomerCountry.COSTA_RICA}>Costa Rica</MenuItem>
                          <MenuItem value={CustomerCountry.CHILE}>Chile</MenuItem>
                          <MenuItem value={CustomerCountry.ECUADOR}>Ecuador</MenuItem>
                          <MenuItem value={CustomerCountry.MEXICO}>México</MenuItem>
                          <MenuItem value={CustomerCountry.PANAMA}>Panamá</MenuItem>
                          <MenuItem value={CustomerCountry.PARAGUAY}>Paraguay</MenuItem>
                          <MenuItem value={CustomerCountry.PERU}>Perú</MenuItem>
                          <MenuItem value={CustomerCountry.URUGUAY}>Uruguay</MenuItem>
                          <MenuItem value={CustomerCountry.VENEZUELA}>Venezuela</MenuItem>
                        </Select>
                        <FormHelperText>
                          Selecciona el país dónde se encuentra la sede de tu empresa
                        </FormHelperText>
                      </FormControl>
                    </div>
                  </FormControl>
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
          .input-label {
            margin-top: 2%;
          }
          .question {
            display: flex;
          }
          .info-section {
            padding: 2%;
            float: right;
            width: 25%;
            height: 190px;
            background: linear-gradient(127.45deg, #d0c9c8 31.19%, rgba(240, 237, 237, 0) 155.12%);
            border-radius: 4%;
            font-style: italic;
          }
          .section-title {
            marging: 1%;
            display: flex;
          }
          .section-title img {
            float: left;
            width: 60px;
            height: 60px;
            marging: 3px;
          }
          .section-title h2 {
            float: right;
            margin-left: 5px;
          }
          .survey-section {
            padding: 2% 2%;
            margin: 4%;
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
          .selector-with-info {
            margin-right: 20px;
            float: left;
            margin-top: 20px;
            width: 70%;
          }
          .selector {
            margin-top: 20px;
            width: 100%;
          }
          .slider {
            margin: 6% 2%;
          }
        `}</style>
      </MuiThemeProvider>
    </div>
  )
}

export default Home
