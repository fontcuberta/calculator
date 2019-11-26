import fetch from "node-fetch"

type FinancialPlan = {
  onboardingTotalPrice: number
  platformTotalPrice: number
  dataCollectionTotalPrice: number
  reportingTotalPrice: number
  totalPrice: number
}

type User = {
  companyType: string
  lastname: string
  firstname: string
  email: string
  country: string
}

export class HubspotClient {
  private apiKey: string

  constructor(apiKey = "b0e533fb-1f93-4b0b-b3b4-5348e8b11742") {
    this.apiKey = apiKey
  }

  async sendFinancialPlan(user: User, financialPlan: FinancialPlan): Promise<object> {
    console.log("Sending to backend")
    console.log({
      onboarding_total_price: financialPlan.onboardingTotalPrice,
      platform_total_price: financialPlan.platformTotalPrice,
      data_collection_total_price: financialPlan.dataCollectionTotalPrice,
      reporting_total_price: financialPlan.reportingTotalPrice,
      max_total_price: financialPlan.totalPrice,
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      country: user.country,
      company_type: user.companyType,
    })

    return fetch(
      `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${user.email}/?hapikey=${this.apiKey}`,

      {
        method: "POST",
        body: JSON.stringify({
          properties: [
            { property: "onboarding_total_price", value: financialPlan.onboardingTotalPrice },
            { property: "platform_total_price", value: financialPlan.platformTotalPrice },
            {
              property: "data_collection_total_price",
              value: financialPlan.dataCollectionTotalPrice,
            },
            { property: "reporting_total_price", value: financialPlan.reportingTotalPrice },
            { property: "max_total_price", value: financialPlan.totalPrice },
            { property: "lastname", value: user.lastname },
            { property: "firstname", value: user.firstname },
            { property: "email", value: user.email },
            { property: "country", value: user.country },
            { property: "company_type", value: user.companyType },
          ],
        }),
      },
    ).then(response => response.json())
  }
}
