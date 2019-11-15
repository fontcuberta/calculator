import fetch from "node-fetch"

type FinancialPlan = {
  minTotalPrice: number
  maxTotalPrice: number
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
      min_total_price: financialPlan.minTotalPrice,
      max_total_price: financialPlan.maxTotalPrice,
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      country: user.country,
      company_type: user.companyType,
    })

    return fetch(`https://api.hubapi.com/contacts/v1/contact/?hapikey=${this.apiKey}`, {
      method: "POST",
      body: JSON.stringify({
        properties: [
          { property: "min_total_price", value: financialPlan.minTotalPrice },
          { property: "max_total_price", value: financialPlan.maxTotalPrice },
          { property: "lastname", value: user.lastname },
          { property: "firstname", value: user.firstname },
          { property: "email", value: user.email },
          { property: "country", value: user.country },
          { property: "company_type", value: user.companyType },
        ],
      }),
    }).then(response => response.json())
  }
}
