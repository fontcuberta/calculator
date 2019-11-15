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
  onboardingType: OnboardingType
}

const PROJECT_UNIT_PRICE = 1200
const DASHBOARD_UNIT_PRICE = 250
const EXPECTED_DASHBOARDS_SELECTED = 5

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
    impactMeasurementFinancialPlan.measureGoal,
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
  const totalReportingPrice = 2500

  const totalFinancialPlan =
    totalOnboardingPrice + totalPlatformPrice + totalDataCollectionPrice + totalReportingPrice
  // TODO: Establecer qué vamos a hacer con medición de levantamiento de información
  // TODO: Establecer qué vamos a hacer con medición de reportes

  return totalFinancialPlan
}

function getProjectBasePrice(numberOfProjects: number, projectUnitPrice: number) {
  // TODO: revisar qué pasa con este total
  return (numberOfProjects - 1) * projectUnitPrice
}

function getOnboardingUnitPrice(companyType: CompanyType, measureGoal: MeasureGoal) {
  if (
    companyType === CompanyType.MULTINATIONAL_CORPORATION &&
    measureGoal === MeasureGoal.INVESTMENT_DECISION
  ) {
    return 1200
  }

  throw new Error(`getOnboardingUnitPrice not implemented for ${companyType} and ${measureGoal}`)
}

function getOrganizationUnitPrice(companyType: CompanyType, measureGoal: MeasureGoal) {
  if (
    companyType === CompanyType.MULTINATIONAL_CORPORATION &&
    measureGoal === MeasureGoal.INVESTMENT_DECISION
  ) {
    return 12003
  }

  throw new Error(`getOnboardingUnitPrice not implemented for ${companyType} and ${measureGoal}`)
}

export function getMinAndMaxLimits(totalFinancialPlan: number) {
  const minTotalFinancialPlan = Math.round(totalFinancialPlan * (PERCENTAGE_LOWER_LIMIT / 100)) //20% menos
  const maxTotalFinancialPlan = Math.round(totalFinancialPlan * (PERCENTAGE_UPPER_LIMIT / 100)) //20% más

  return [minTotalFinancialPlan, maxTotalFinancialPlan]
}
