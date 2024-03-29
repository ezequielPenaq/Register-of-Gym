import { verifyJwt } from "@/env/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";




export async function checkInsRoutes(app: FastifyInstance) {
   app.addHook('onRequest',verifyJwt)

    app.get('/check-ins/history',history)
    app.get('/check-ins/metrics',metrics)


   app.post('/gyms/:gymId/Check-Ins',create)
   app.patch('/check-ins/:checkInId/validate',validate)

}
