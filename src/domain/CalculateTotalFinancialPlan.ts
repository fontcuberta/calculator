export enum CompanyType {
  MULTINATIONAL_CORPORATION = "Multinacional / Corporación",
  COMPANY = "Empresa",
  NGO = "NGO",
}
export enum CompanyDescription {
  NGO = "Organizaciones sin fines de lucro, pequeñas, medianas o grandes.",
  COMPANY = "Empresa nacional pequeña, mediana o grande todavía en desarrollo o crecimiento.",
  MULTINATIONAL = "Empresas grandes (retailers, bancos, Productos de consumo, entre otras) que poseen gran cantidad de grupos de interés nacionales e internacionales.",
}
export enum OnboardingDescription {
  NO_ONBOARDING = "No necesitas ningún apoyo en la planificación de tu medición en nuestra plataforma",
  THEORY_OF_CHANGE = "No tienes nuestra teoría del cambio y te gustaría desarrollarla con nosotros, pero no estamos listos para desarrollar todo el plan de medición.",
  GROUP_WEBINAR = "El proceso del diseño de la medición se realiza en conjunto con otras organizaciones a través de webinars.",
  INDIVIDUAL_WEBINAR = "Realizas el proceso de medición individualmente siguiendo webinars online no personalizados.",
  CUSTOMIZED = "El proceso del diseño de la medición se realiza uno a uno contigo con un consultor asignado para tus necesidades",
}

export enum MeasureGoal {
  PUBLIC_POLICY = "Influir en políticas públicas",
  INVESTMENT_DECISION = "Tomar decisiones de inversión",
  FUNDRAISING = "Levantar fondos",
  REVENUE_ASSURANCE = "Demostrar el retorno",
  ACCOUNTABILITY = "Rendición de cuentas",
  INSIGHTS_FINDING = "Conocer insights o necesidades",
}

export enum OnboardingType {
  CUSTOMIZED = "Sesiones 100% personalizadas. Consultor dedicado",
  THEORY_OF_CHANGE = "Diseño de indicadores y Teoría del Cambio",
  GROUP_WEBINAR = "Diseño de medición grupal (fechas fijas)",
  INDIVIDUAL_WEBINAR = "Webinars y sesiones dedicadas con un consultor",
  NO_ONBOARDING = "Cotizar solo el software de Cuantix",
}

export enum CustomerCountry {
  ARGENTINA = "Argentina",
  BOLIVIA = "Bolivia",
  BRASIL = "Brasil",
  CHILE = "Chile",
  COLOMBIA = "Colombia",
  COSTA_RICA = "Costa Rica",
  ECUADOR = "Ecuador",
  EL_SALVADOR = "El Salvador",
  ESPANA = "España",
  GUATEMALA = "Guatemala",
  HONDURAS = "Honduras",
  MEXICO = "México",
  PANAMA = "Panamá",
  PARAGUAY = "Paraguay",
  PERU = "Perú",
  REPUBLICA_DOMINICANA = "República Dominicana",
  URUGUAY = "Uruguay",
  VENEZUELA = "Venezuela",
}

export enum DataCollectionType {
  CALL = "Mis beneficiarios tienen más de 15 años, NO poseen acceso a tecnología y no tengo contacto en persona con ellos",
  WHATSAPP = "Mis beneficiarios tienen más de 15 años y poseen acceso a un teléfono inteligente",
  OFFLINE = "Tengo contacto en persona con mis beneficiarios y puedo levantar información en campo, o son jóvenes o niños y debo levantar información en papel",
}

export enum TermType {
  SHORT_TERM = "En menos de 3 meses",
  MEDIUM_TERM = "En menos de 6 meses",
  LONG_TERM = "En este año",
  NOT_SURE = "Aún no lo hemos definido",
}

export type ImpactMeasurementFinancialPlan = {
  companyType: CompanyType
  measureGoal: MeasureGoal
  numberOfOrganizations: number
  numberOfProjects: number
  numberOfBeneficiaries: number
  dataCollectionType: DataCollectionType
  numberOfEbookReports: number
  numberOfPDFReports: number
  numberOfReadableReports: number
  numberOfExecutiveReports: number
  numberOfOnePagerReports: number
  numberOfDashboardReports: number
  onboardingType: OnboardingType
}

const PROJECT_UNIT_PRICE = 1200
const DASHBOARD_UNIT_PRICE = 250
const EBOOK_REPORT_UNIT_PRICE = 2500
const PDF_REPORT_UNIT_PRICE = 1800
const READABLE_REPORT_UNIT_PRICE = 1500
const EXECUTIVE_REPORT_UNIT_PRICE = 700
const ONEPAGER_REPORT_UNIT_PRICE = 400
const DASHBOARD_REPORT_UNIT_PRICE = 300

export function calculateTotalFinancialPlan(
  impactMeasurementFinancialPlan: ImpactMeasurementFinancialPlan,
) {
  const organizationUnitPrice = getOrganizationUnitPrice(
    impactMeasurementFinancialPlan.companyType,
    impactMeasurementFinancialPlan.measureGoal,
  )
  const onboardingUnitPrice = getOnboardingUnitPrice(
    impactMeasurementFinancialPlan.companyType,
    impactMeasurementFinancialPlan.onboardingType,
  )
  const organizationBasePrice =
    impactMeasurementFinancialPlan.numberOfOrganizations * organizationUnitPrice
  const onboardingBasePrice = impactMeasurementFinancialPlan.numberOfProjects * onboardingUnitPrice
  const totalOnboardingPrice = organizationBasePrice + onboardingBasePrice

  const projectUnitPrice = PROJECT_UNIT_PRICE
  const projectBasePrice = getProjectBasePrice(
    impactMeasurementFinancialPlan.numberOfProjects,
    projectUnitPrice,
  )
  const totalPlatformPrice = projectBasePrice + DASHBOARD_UNIT_PRICE
  const totalDataCollectionPrice = getTotalDataCollectionPrice(
    impactMeasurementFinancialPlan.numberOfProjects,
    impactMeasurementFinancialPlan.numberOfBeneficiaries,
    impactMeasurementFinancialPlan.dataCollectionType,
    impactMeasurementFinancialPlan.companyType,
  )

  const totalReportingPrice =
    impactMeasurementFinancialPlan.numberOfEbookReports * EBOOK_REPORT_UNIT_PRICE +
    impactMeasurementFinancialPlan.numberOfPDFReports * PDF_REPORT_UNIT_PRICE +
    impactMeasurementFinancialPlan.numberOfReadableReports * READABLE_REPORT_UNIT_PRICE +
    impactMeasurementFinancialPlan.numberOfExecutiveReports * EXECUTIVE_REPORT_UNIT_PRICE +
    impactMeasurementFinancialPlan.numberOfOnePagerReports * ONEPAGER_REPORT_UNIT_PRICE +
    impactMeasurementFinancialPlan.numberOfDashboardReports * DASHBOARD_REPORT_UNIT_PRICE

  const totalPrice =
    totalOnboardingPrice + totalPlatformPrice + totalDataCollectionPrice + totalReportingPrice

  return [
    totalOnboardingPrice,
    totalPlatformPrice,
    totalDataCollectionPrice,
    totalReportingPrice,
    totalPrice,
  ]
}

export function getTotalDataCollectionPrice(
  numberOfProjects: number,
  numberOfBeneficiaries: number,
  dataCollectionType: DataCollectionType,
  companyType: CompanyType,
) {
  const TOTAL_COORDINATION = companyType === CompanyType.MULTINATIONAL_CORPORATION ? 500 : 0
  const WHATSAPP_MESSAGE_COST = 0.05
  const ESTIMATED_MSGGES_FOR_BENEFICIARY = 5
  if (dataCollectionType === DataCollectionType.WHATSAPP) {
    if (numberOfBeneficiaries <= 100) {
      return numberOfProjects * 600 + TOTAL_COORDINATION
    } else {
      return (
        numberOfProjects *
          (WHATSAPP_MESSAGE_COST *
            (ESTIMATED_MSGGES_FOR_BENEFICIARY * (numberOfBeneficiaries - 100)) +
            600) +
        TOTAL_COORDINATION
      )
    }
  }
  if (dataCollectionType === DataCollectionType.OFFLINE) {
    return 0 // Data Collection on paper is included in the platform total
  }
  if (dataCollectionType === DataCollectionType.CALL) {
    return numberOfBeneficiaries * 2 + TOTAL_COORDINATION
  }
  throw new Error(`getTotalDataCollectionPrice not implemented for ${dataCollectionType}`)
}
function getProjectBasePrice(numberOfProjects: number, projectUnitPrice: number) {
  return (numberOfProjects - 1) * projectUnitPrice
}

function getOnboardingUnitPrice(companyType: CompanyType, onboardingType: OnboardingType) {
  if (companyType === CompanyType.MULTINATIONAL_CORPORATION) {
    if (onboardingType === OnboardingType.THEORY_OF_CHANGE) {
      return 1200
    }
    if (onboardingType === OnboardingType.GROUP_WEBINAR) {
      return 603
    }
    if (onboardingType === OnboardingType.INDIVIDUAL_WEBINAR) {
      return 1003
    }
    if (onboardingType === OnboardingType.CUSTOMIZED) {
      return 1603
    }
    if (onboardingType === OnboardingType.NO_ONBOARDING) {
      return 0
    }
  } else {
    if (onboardingType === OnboardingType.THEORY_OF_CHANGE) {
      return 802
    }
    if (onboardingType === OnboardingType.GROUP_WEBINAR) {
      return 602
    }
    if (onboardingType === OnboardingType.INDIVIDUAL_WEBINAR) {
      return 1002
    }
    if (onboardingType === OnboardingType.CUSTOMIZED) {
      return 1602
    }
    if (onboardingType === OnboardingType.NO_ONBOARDING) {
      return 0
    }
  }
  throw new Error(`getOnboardingUnitPrice not implemented for ${companyType} and ${onboardingType}`)
}

function getOrganizationUnitPrice(companyType: CompanyType, measureGoal: MeasureGoal) {
  if (companyType === CompanyType.MULTINATIONAL_CORPORATION) {
    if (measureGoal === MeasureGoal.PUBLIC_POLICY) {
      return 30003
    }
    if (measureGoal === MeasureGoal.INVESTMENT_DECISION) {
      return 12003
    }
    if (measureGoal === MeasureGoal.FUNDRAISING) {
      return 1003
    }
    if (measureGoal === MeasureGoal.REVENUE_ASSURANCE) {
      return 1003
    }
    if (measureGoal === MeasureGoal.ACCOUNTABILITY) {
      return 803
    }
    if (measureGoal === MeasureGoal.INSIGHTS_FINDING) {
      return 303
    }
  } else {
    if (measureGoal === MeasureGoal.PUBLIC_POLICY) {
      return 30002
    }
    if (measureGoal === MeasureGoal.INVESTMENT_DECISION) {
      return 12002
    }
    if (measureGoal === MeasureGoal.FUNDRAISING) {
      return 1002
    }
    if (measureGoal === MeasureGoal.REVENUE_ASSURANCE) {
      return 1002
    }
    if (measureGoal === MeasureGoal.ACCOUNTABILITY) {
      return 802
    }
    if (measureGoal === MeasureGoal.INSIGHTS_FINDING) {
      return 302
    }
  }
  throw new Error(`getOrganizationUnitPrice not implemented for ${companyType} and ${measureGoal}`)
}
