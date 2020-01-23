import { HubspotClient } from "../infrastructure/hubspotClient"
import {
  calculateTotalFinancialPlan,
  ImpactMeasurementFinancialPlan,
} from "../domain/CalculateTotalFinancialPlan"

export type User = {
  country: string
  firstname: string
  lastname: string
  email: string
  phone: string
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
    const [
      onboardingTotalPrice,
      platformTotalPrice,
      dataCollectionTotalPrice,
      reportingTotalPrice,
      totalPrice,
    ] = calculateTotalFinancialPlan({
      companyType: financialPlanAndUser.impactMeasurementFinancialPlan.companyType,
      numberOfProjects: financialPlanAndUser.impactMeasurementFinancialPlan.numberOfProjects,
      numberOfBeneficiaries:
        financialPlanAndUser.impactMeasurementFinancialPlan.numberOfOrganizations,
      numberOfOrganizations:
        financialPlanAndUser.impactMeasurementFinancialPlan.numberOfOrganizations,
      measureGoal: financialPlanAndUser.impactMeasurementFinancialPlan.measureGoal,
      onboardingType: financialPlanAndUser.impactMeasurementFinancialPlan.onboardingType,
      dataCollectionType: financialPlanAndUser.impactMeasurementFinancialPlan.dataCollectionType,
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

    const result = await this.hubspotClient.sendFinancialPlan(
      {
        companyType: financialPlanAndUser.impactMeasurementFinancialPlan.companyType,
        country: financialPlanAndUser.user.country,
        firstname: financialPlanAndUser.user.firstname,
        lastname: financialPlanAndUser.user.lastname,
        email: financialPlanAndUser.user.email,
        phone: financialPlanAndUser.user.phone,
      },
      {
        onboardingTotalPrice,
        platformTotalPrice,
        dataCollectionTotalPrice,
        reportingTotalPrice,
        totalPrice,
      },
    )

    console.log("Api result:", result)
  }
}
