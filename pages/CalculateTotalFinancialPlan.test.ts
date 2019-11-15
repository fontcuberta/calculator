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
    const decisionMakingPriceForMultinationals = 12003;
    const organizationPriceForMultinationals = 5000;
    const totalOrganizationPrice =
      numberOfOrganizations * organizationPriceForMultinationals;
    const theoryOfChangePriceForMultinationals = 403;
    const theoryOfChangeTotalPrice =
      theoryOfChangePriceForMultinationals * numberOfProjects;

    const totalPrice =
      decisionMakingPriceForMultinationals +
      totalOrganizationPrice +
      theoryOfChangeTotalPrice;

    expect(min).toEqual(1000);
    expect(max).toEqual(2000);
  });
});
