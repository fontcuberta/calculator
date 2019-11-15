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
    financialPlanService
      .calculateTotalFincancialPlanAndSave(body)
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
    res.status(400).send({
      errorMessage: "Missing fields",
    })
  }

  console.log("Tengo la respuesta en el lado del servidor", body)
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
