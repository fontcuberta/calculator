import {
  calculateTotalFinancialPlan,
  getTotalDataCollectionPrice,
  CompanyType,
  MeasureGoal,
  OnboardingType,
  DataCollectionType,
} from "./CalculateTotalFinancialPlan"

describe("GetTotalDataCollectionPrice", () => {
  const numberOfProjects = 4

  it("gets totalDataCollectionPrice for 100 beneficiaries and Whatsapp and Multinational", () => {
    const numberOfBeneficiaries = 100
    const dataCollectionType = DataCollectionType.WHATSAPP
    const companyType = CompanyType.MULTINATIONAL_CORPORATION

    // This number is extracted from the calculations of the "Cotizador de precios" excel
    const totalDataCollectionPriceExpected = 2900

    expect(
      getTotalDataCollectionPrice(
        numberOfProjects,
        numberOfBeneficiaries,
        dataCollectionType,
        companyType,
      ),
    ).toEqual(totalDataCollectionPriceExpected)
  })
  it("gets totalDataCollectionPrice for under 100 beneficiaries and Whatsapp and Multinational", () => {
    const numberOfBeneficiaries = 50
    const dataCollectionType = DataCollectionType.WHATSAPP
    const companyType = CompanyType.MULTINATIONAL_CORPORATION

    // This number is extracted from the calculations of the "Cotizador de precios" excel
    const totalDataCollectionPriceExpected = 2900

    expect(
      getTotalDataCollectionPrice(
        numberOfProjects,
        numberOfBeneficiaries,
        dataCollectionType,
        companyType,
      ),
    ).toEqual(totalDataCollectionPriceExpected)
  })
  it("gets totalDataCollectionPrice for over 100 beneficiaries and Whatsapp and Multinational", () => {
    const numberOfBeneficiaries = 150
    const dataCollectionType = DataCollectionType.WHATSAPP
    const companyType = CompanyType.MULTINATIONAL_CORPORATION

    // This number is extracted from the calculations of the "Cotizador de precios" excel
    const totalDataCollectionPriceExpected = 2950

    expect(
      getTotalDataCollectionPrice(
        numberOfProjects,
        numberOfBeneficiaries,
        dataCollectionType,
        companyType,
      ),
    ).toEqual(totalDataCollectionPriceExpected)
  })
  it("gets totalDataCollectionPrice for offline and Multinational", () => {
    const numberOfBeneficiaries = 150
    const dataCollectionType = DataCollectionType.OFFLINE
    const companyType = CompanyType.MULTINATIONAL_CORPORATION

    // This number is extracted from the calculations of the "Cotizador de precios" excel
    const totalDataCollectionPriceExpected = 0

    expect(
      getTotalDataCollectionPrice(
        numberOfProjects,
        numberOfBeneficiaries,
        dataCollectionType,
        companyType,
      ),
    ).toEqual(totalDataCollectionPriceExpected)
  })
  it("gets totalDataCollectionPrice for calls, under 100 beneficiaries and Multinational", () => {
    const numberOfBeneficiaries = 50
    const dataCollectionType = DataCollectionType.CALL
    const companyType = CompanyType.MULTINATIONAL_CORPORATION

    // This number is extracted from the calculations of the "Cotizador de precios" excel
    const totalDataCollectionPriceExpected = 600

    expect(
      getTotalDataCollectionPrice(
        numberOfProjects,
        numberOfBeneficiaries,
        dataCollectionType,
        companyType,
      ),
    ).toEqual(totalDataCollectionPriceExpected)
  })
  it("gets totalDataCollectionPrice for calls, 100 beneficiaries and Multinational", () => {
    const numberOfBeneficiaries = 100
    const dataCollectionType = DataCollectionType.CALL
    const companyType = CompanyType.MULTINATIONAL_CORPORATION

    // This number is extracted from the calculations of the "Cotizador de precios" excel
    const totalDataCollectionPriceExpected = 700

    expect(
      getTotalDataCollectionPrice(
        numberOfProjects,
        numberOfBeneficiaries,
        dataCollectionType,
        companyType,
      ),
    ).toEqual(totalDataCollectionPriceExpected)
  })
  it("gets totalDataCollectionPrice for calls, more than 100 beneficiaries and Multinational", () => {
    const numberOfBeneficiaries = 150
    const dataCollectionType = DataCollectionType.CALL
    const companyType = CompanyType.MULTINATIONAL_CORPORATION

    // This number is extracted from the calculations of the "Cotizador de precios" excel
    const totalDataCollectionPriceExpected = 800

    expect(
      getTotalDataCollectionPrice(
        numberOfProjects,
        numberOfBeneficiaries,
        dataCollectionType,
        companyType,
      ),
    ).toEqual(totalDataCollectionPriceExpected)
  })
})

describe("CalculateTotalFinancialPlan", () => {
  xit("calculates total financial plan", () => {
    const customerData = {
      companyType: CompanyType.MULTINATIONAL_CORPORATION,
      measureGoal: MeasureGoal.INVESTMENT_DECISION,
      numberOfOrganizations: 3,
      numberOfProjects: 4,
      numberOfBeneficiaries: 100,
      dataCollectionType: DataCollectionType.WHATSAPP,
      numberOfEbookReports: 1,
      numberOfPDFReports: 0,
      numberOfReadableReports: 0,
      numberOfExecutiveReports: 0,
      numberOfOnePagerReports: 0,
      numberOfDashboardReports: 0,
      onboardingType: OnboardingType.THEORY_OF_CHANGE,
    }

    // This number is extracted from the calculations of the "Cotizador de precios" excel
    const totalFinancialPlan = 49509
    console.log(calculateTotalFinancialPlan(customerData)[4])

    expect(calculateTotalFinancialPlan(customerData)[4]).toEqual(totalFinancialPlan)
  })
  xit("calculates the lower and upper limits of the financial plan", () => {
    const [min, max] = getMinAndMaxLimits(10000)

    expect(min).toEqual(8000)
    expect(max).toEqual(12000)
  })
})
