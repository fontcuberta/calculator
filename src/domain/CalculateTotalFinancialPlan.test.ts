import {
  calculateTotalFinancialPlan,
  CompanyType,
  MeasureGoal,
  OnboardingType,
  getMinAndMaxLimits,
} from "./CalculateTotalFinancialPlan"

describe("CalculateTotalFinancialPlan", () => {
  it("calculates total financial plan", () => {
    const customerData = {
      companyType: CompanyType.MULTINATIONAL_CORPORATION,
      measureGoal: MeasureGoal.INVESTMENT_DECISION,
      numberOfOrganizations: 3,
      numberOfProjects: 4,
      numberOfEbookReports: 1,
      numberOfPDFReports: 1,
      numberOfReadableReports: 1,
      numberOfExecutiveReports: 1,
      numberOfOnePagerReports: 1,
      numberOfDashboardReports: 1,
      onboardingType: OnboardingType.THEORY_OF_CHANGE,
    }

    // This number is extracted from the calculations of the "Cotizador de precios" excel
    const totalFinancialPlan = 62359

    expect(calculateTotalFinancialPlan(customerData)).toEqual(totalFinancialPlan)
  })
  it("calculates the lower and upper limits of the financial plan", () => {
    const [min, max] = getMinAndMaxLimits(10000)

    expect(min).toEqual(8000)
    expect(max).toEqual(12000)
  })
})
