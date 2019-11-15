import { HubspotClient } from "../infrastructure/hubspotClient"
import {
  getMinAndMaxLimits,
  calculateTotalFinancialPlan,
  CompanyType,
  MeasureGoal,
  OnboardingType,
} from "../domain/CalculateTotalFinancialPlan"

export class FinancialPlanService {
  private hubspotClient: HubspotClient

  constructor() {
    this.hubspotClient = new HubspotClient()
  }

  async calculateTotalFincancialPlanAndSave() {
    const companyType = CompanyType.MULTINATIONAL_CORPORATION

    const totalFinancialPlan = calculateTotalFinancialPlan({
      numberOfProjects: 3,
      numberOfOrganizations: 4,
      companyType: companyType,
      measureGoal: MeasureGoal.INVESTMENT_DESICION,
      onboardingType: OnboardingType.THEORY_OF_CHANGE,
    })

    const [minTotalPrice, maxTotalPrice] = getMinAndMaxLimits(totalFinancialPlan)

    const result = await this.hubspotClient.sendFinancialPlan(
      {
        companyType,
        country: "Venezuela",
        firstname: "Dani",
        lastname: "Fontcuberta",
        email: "dani@fontcuberta.es",
      },
      {
        minTotalPrice,
        maxTotalPrice,
      },
    )

    console.log("Api result:", result)
  }
}
