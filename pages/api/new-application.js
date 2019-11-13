// import { NextApiRequest, NextApiResponse } from "next"


/**
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default (req, res) => {
    if (req.method !== "POST") {
        res.status(409).send()
    }
    
    const body = JSON.parse(req.body)
    
    console.log("Tengo la respuesta en el lado del servidor", body)

    res.status(200).send({
        status: "ok"
    })
}