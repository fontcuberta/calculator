import { HubspotClient } from "../infrastructure/hubspotClient"
import {
  getMinAndMaxLimits,
  calculateTotalFinancialPlan,
  CompanyType,
  MeasureGoal,
  OnboardingType,
  ImpactMeasurementFinancialPlan,
} from "../domain/CalculateTotalFinancialPlan"
import { StringLiteral } from "@babel/types"

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

  async calculateTotalFincancialPlanAndSave(financialPlanAndUser: FinancialPlanAndUser) {
    const companyType = CompanyType.MULTINATIONAL_CORPORATION

    const totalFinancialPlan = calculateTotalFinancialPlan({
      numberOfProjects: financialPlanAndUser.impactMeasurementFinancialPlan.numberOfProjects,
      numberOfOrganizations:
        financialPlanAndUser.impactMeasurementFinancialPlan.numberOfOrganizations,
      companyType: financialPlanAndUser.impactMeasurementFinancialPlan.companyType,
      measureGoal: financialPlanAndUser.impactMeasurementFinancialPlan.measureGoal,
      onboardingType: financialPlanAndUser.impactMeasurementFinancialPlan.onboardingType,
    })

    const [minTotalPrice, maxTotalPrice] = getMinAndMaxLimits(totalFinancialPlan)

    const result = await this.hubspotClient.sendFinancialPlan(
      {
        companyType,
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
