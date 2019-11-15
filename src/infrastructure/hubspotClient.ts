export class HubspotClient {
  private apiKey: string

  constructor(apiKey = "b0e533fb-1f93-4b0b-b3b4-5348e8b11742") {
    this.apiKey = apiKey
  }

  async sendFinancialPlan(): Promise<void> {
    await fetch(`https://api.hubapi.com/contacts/v1/contact/?hapikey=${this.apiKey}`, {
      method: "POST",
      body: JSON.stringify({
        payload: "tus vainas"
      })
    })
  }
}