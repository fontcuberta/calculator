import { NextApiRequest, NextApiResponse } from "next"
import {
  FinancialPlanService,
  FinancialPlanAndUser,
  User,
} from "../../application/FinancialPlanService"
import { ImpactMeasurementFinancialPlan } from "../../domain/CalculateTotalFinancialPlan"

const financialPlanService = new FinancialPlanService()

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(409).send("Something")
  }

  const body = JSON.parse(req.body)

  if (isCustomerPayload(body)) {
    console.log("Tengo la respuesta en el lado del servidor", body)
    financialPlanService
      .calculateTotalFinancialPlanAndSave(body)
      .then(() => {
        res.status(200).send({
          status: "ok",
        })
      })
      .catch(error => {
        console.error(error)
        res.status(400).send({
          errorMessage: "Unknown error",
        })
      })
  } else {
    console.error("missing", body)
    res.status(400).send({
      errorMessage: "Missing fields",
    })
  }
}

function isCustomerPayload(customerPayload: any): customerPayload is FinancialPlanAndUser {
  return (
    isImpactMeasurementFinancialPlan(customerPayload.impactMeasurementFinancialPlan) &&
    isUser(customerPayload.user)
  )
}

function isImpactMeasurementFinancialPlan(
  impactMeasurementFinancialPlan: any,
): impactMeasurementFinancialPlan is ImpactMeasurementFinancialPlan {
  if (!impactMeasurementFinancialPlan) {
    return false
  }

  if (typeof impactMeasurementFinancialPlan.companyType !== "string") {
    return false
  }
  if (typeof impactMeasurementFinancialPlan.measureGoal !== "string") {
    return false
  }
  if (typeof impactMeasurementFinancialPlan.numberOfOrganizations !== "number") {
    return false
  }
  if (typeof impactMeasurementFinancialPlan.numberOfProjects !== "number") {
    return false
  }
  if (typeof impactMeasurementFinancialPlan.numberOfBeneficiaries !== "number") {
    return false
  }
  if (typeof impactMeasurementFinancialPlan.dataCollectionType !== "string") {
    return false
  }
  if (typeof impactMeasurementFinancialPlan.numberOfEbookReports !== "number") {
    return false
  }
  if (typeof impactMeasurementFinancialPlan.numberOfPDFReports !== "number") {
    return false
  }
  if (typeof impactMeasurementFinancialPlan.numberOfReadableReports !== "number") {
    return false
  }
  if (typeof impactMeasurementFinancialPlan.numberOfExecutiveReports !== "number") {
    return false
  }
  if (typeof impactMeasurementFinancialPlan.numberOfOnePagerReports !== "number") {
    return false
  }
  if (typeof impactMeasurementFinancialPlan.numberOfDashboardReports !== "number") {
    return false
  }
  if (typeof impactMeasurementFinancialPlan.onboardingType !== "string") {
    return false
  }
  return true
}

function isUser(user: any): user is User {
  if (!user) {
    return false
  }

  if (typeof user.country !== "string") {
    return false
  }
  if (typeof user.firstname !== "string") {
    return false
  }
  if (typeof user.lastname !== "string") {
    return false
  }
  if (typeof user.email !== "string") {
    return false
  }
  return true
}
