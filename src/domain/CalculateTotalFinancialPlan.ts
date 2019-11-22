export enum CompanyType {
  MULTINATIONAL_CORPORATION = "Multinacional / Corporación",
  COMPANY = "Empresa",
  NGO = "NGO",
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
  CUSTOMIZED = "Personalizado",
  THEORY_OF_CHANGE = "Diseño Teoría de Cambio",
  GROUP_WEBINAR = "Webinar Grupal",
  INDIVIDUAL_WEBINAR = "Webinar Individual",
  NO_ONBOARDING = "Sin Onboarding",
}

export type ImpactMeasurementFinancialPlan = {
  companyType: CompanyType
  measureGoal: MeasureGoal
  numberOfOrganizations: number
  numberOfProjects: number
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
const EXPECTED_DASHBOARDS_SELECTED = 5
const EBOOK_REPORT_UNIT_PRICE = 2500
const PDF_REPORT_UNIT_PRICE = 1800
const READABLE_REPORT_UNIT_PRICE = 1500
const EXECUTIVE_REPORT_UNIT_PRICE = 700
const ONEPAGER_REPORT_UNIT_PRICE = 400
const DASHBOARD_REPORT_UNIT_PRICE = 300

const PERCENTAGE_LOWER_LIMIT = 80
const PERCENTAGE_UPPER_LIMIT = 120

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
  const dashboardUnitPrice = DASHBOARD_UNIT_PRICE
  const projectBasePrice = getProjectBasePrice(
    impactMeasurementFinancialPlan.numberOfProjects,
    projectUnitPrice,
  )
  const dashboardBasePrice = EXPECTED_DASHBOARDS_SELECTED * dashboardUnitPrice // TODO: Establecer qué vamos a hacer con este cálculo para no preguntar al usuario esto
  const totalPlatformPrice = projectBasePrice + dashboardBasePrice
  const totalDataCollectionPrice = 9500
  const totalReportingPrice =
    impactMeasurementFinancialPlan.numberOfEbookReports * EBOOK_REPORT_UNIT_PRICE +
    impactMeasurementFinancialPlan.numberOfPDFReports * PDF_REPORT_UNIT_PRICE +
    impactMeasurementFinancialPlan.numberOfReadableReports * READABLE_REPORT_UNIT_PRICE +
    impactMeasurementFinancialPlan.numberOfExecutiveReports * EXECUTIVE_REPORT_UNIT_PRICE +
    impactMeasurementFinancialPlan.numberOfOnePagerReports * ONEPAGER_REPORT_UNIT_PRICE +
    impactMeasurementFinancialPlan.numberOfDashboardReports * DASHBOARD_REPORT_UNIT_PRICE

  const totalFinancialPlan =
    totalOnboardingPrice + totalPlatformPrice + totalDataCollectionPrice + totalReportingPrice
  // TODO: Establecer qué vamos a hacer con medición de levantamiento de información

  return totalFinancialPlan
}

function getProjectBasePrice(numberOfProjects: number, projectUnitPrice: number) {
  // TODO: revisar qué pasa con este total
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

export function getMinAndMaxLimits(totalFinancialPlan: number) {
  const minTotalFinancialPlan = Math.round(totalFinancialPlan * (PERCENTAGE_LOWER_LIMIT / 100)) //20% menos
  const maxTotalFinancialPlan = Math.round(totalFinancialPlan * (PERCENTAGE_UPPER_LIMIT / 100)) //20% más

  return [minTotalFinancialPlan, maxTotalFinancialPlan]
}
