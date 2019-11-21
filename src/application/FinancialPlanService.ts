import { HubspotClient } from "../infrastructure/hubspotClient"
import {
  getMinAndMaxLimits,
  calculateTotalFinancialPlan,
  ImpactMeasurementFinancialPlan,
} from "../domain/CalculateTotalFinancialPlan"

export type User = {
  country: string
  firstname: string
  lastname: string
  email: string
}

export type FinancialPlanAndUser = {
  impactMeasurementFinancialPlan: ImpactMeasurementFinancialPlan
  user: User
}

export class FinancialPlanService {
  private hubspotClient: HubspotClient

  constructor() {
    this.hubspotClient = new HubspotClient()
  }

  async calculateTotalFinancialPlanAndSave(financialPlanAndUser: FinancialPlanAndUser) {
    const totalFinancialPlan = calculateTotalFinancialPlan({
      companyType: financialPlanAndUser.impactMeasurementFinancialPlan.companyType,
      numberOfProjects: financialPlanAndUser.impactMeasurementFinancialPlan.numberOfProjects,
      numberOfOrganizations:
        financialPlanAndUser.impactMeasurementFinancialPlan.numberOfOrganizations,
      measureGoal: financialPlanAndUser.impactMeasurementFinancialPlan.measureGoal,
      onboardingType: financialPlanAndUser.impactMeasurementFinancialPlan.onboardingType,
      numberOfEbookReports:
        financialPlanAndUser.impactMeasurementFinancialPlan.numberOfEbookReports,
      numberOfPDFReports: financialPlanAndUser.impactMeasurementFinancialPlan.numberOfPDFReports,
      numberOfReadableReports:
        financialPlanAndUser.impactMeasurementFinancialPlan.numberOfReadableReports,
      numberOfExecutiveReports:
        financialPlanAndUser.impactMeasurementFinancialPlan.numberOfExecutiveReports,
      numberOfOnePagerReports:
        financialPlanAndUser.impactMeasurementFinancialPlan.numberOfOnePagerReports,
      numberOfDashboardReports:
        financialPlanAndUser.impactMeasurementFinancialPlan.numberOfDashboardReports,
    })

    const [minTotalPrice, maxTotalPrice] = getMinAndMaxLimits(totalFinancialPlan)

    const result = await this.hubspotClient.sendFinancialPlan(
      {
        companyType: financialPlanAndUser.impactMeasurementFinancialPlan.companyType,
        country: financialPlanAndUser.user.country,
        firstname: financialPlanAndUser.user.firstname,
        lastname: financialPlanAndUser.user.lastname,
        email: financialPlanAndUser.user.email,
      },
      {
        minTotalPrice,
        maxTotalPrice,
      },
    )

    console.log("Api result:", result)
  }
}
