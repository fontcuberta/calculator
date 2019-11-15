import { NextApiRequest, NextApiResponse } from "next"
import { FinancialPlanService } from "../../application/FinancialPlanService"

const financialPlanService = new FinancialPlanService()

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(409).send("Something")
  }

  const body = JSON.parse(req.body)

  financialPlanService.calculateTotalFincancialPlanAndSave()

  console.log("Tengo la respuesta en el lado del servidor", body)

  res.status(200).send({
    status: "ok",
  })
}
