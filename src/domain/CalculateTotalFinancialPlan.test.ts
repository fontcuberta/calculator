import {
  calculateTotalFinancialPlan,
  CompanyType,
  MeasureGoal,
  OnboardingType,
  getMinAndMaxLimits
} from "./CalculateTotalFinancialPlan"

describe("CalculateTotalFinancialPlan", () => {
  it("calculates total financial plan", () => {
    const customerData = {
      companyType: CompanyType.MULTINATIONAL_CORPORATION,
      measureGoal: MeasureGoal.INVESTMENT_DESICION,
      numberOfOrganizations: 3,
      numberOfProjects: 4,
      onboardingType: OnboardingType.THEORY_OF_CHANGE
    }

    // This number is extracted from the calculations of the "Cotizador de precios" excel
    const totalFinancialPlan = 57659

    expect(calculateTotalFinancialPlan(customerData)).toEqual(totalFinancialPlan)
  })
  it("calculates the lower and upper limits of the financial plan", () => {
    const [min, max] = getMinAndMaxLimits(10000)

    expect(min).toEqual(8000)
    expect(max).toEqual(12000)
  })
})
