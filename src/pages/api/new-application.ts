import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(409).send("Something")
    }

    const body = JSON.parse(req.body)
    
    console.log("Tengo la respuesta en el lado del servidor", body)

    res.status(200).send({
        status: "ok"
    })
}