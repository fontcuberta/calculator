import { calculateTotalFinancialPlan } from "./CalculateTotalFinancialPlan";

describe("CalculateTotalFinancialPlan", () => {
  it("calculates total financial plan", () => {
    const customerData = {
      companyType: "Multinacional / Corporación",
      measureGoal: "Tomar decisiones de inversión",
      numberOfOrganizations: 3,
      numberOfProjects: 4,
      onboardingType: "Diseño Teoría del Cambio"
    };

    const [min, max] = calculateTotalFinancialPlan(customerData);

    const numberOfProjects = 4;
    const numberOfOrganizations = 3;
    const organizationUnitPrice = 12003;
    const onboardingUnitPrice = 1200;
    const organizationBasePrice = numberOfOrganizations * organizationUnitPrice;
    const onboardingBasePrice = numberOfProjects * onboardingUnitPrice;
    const totalOnboardingPrice = organizationBasePrice + onboardingBasePrice;

    const projectUnitPrice = 1200;
    const dashboardUnitPrice = 250;
    const projectBasePrice = 10800 //TODO revisar qué pasa con este total
    const dashboardBasePrice = 5 * dashboardUnitPrice // TODO Establecer qué vamos a hacer con este cálculo para no preguntar al usuario esto
    const totalPlatformPrice = projectBasePrice + dashboardBasePrice;

    // TODO Establecer qué vamos a hacer con medición de levantamiento de información
    // TODO Establecer qué vamos a hacer con medición de reportes

    console.log("totalOnboardingPrice", totalOnboardingPrice)
    console.log("totalPlatformPrice", totalPlatformPrice)

    const totalMin = Math.trunc((totalOnboardingPrice + totalPlatformPrice)*0.8) //20% menos
    const totalMax = Math.trunc((totalOnboardingPrice + totalPlatformPrice)*1.2) //20% más

    expect(min).toEqual(totalMin);
    expect(max).toEqual(totalMax);
  });
});
