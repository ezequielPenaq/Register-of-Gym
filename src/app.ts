import fastify from "fastify";
import {  userRoutes } from "./env/http/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { gymsRoutes } from "./env/http/controllers/users/gym/routes";
import { checkInsRoutes } from "./env/http/controllers/check-Ins/route";
import fastifyCookie from "@fastify/cookie";



export const app = fastify()

app.register(fastifyJwt,{
    secret:env.JWT_SECRET,
    cookie:{
        cookieName:'refreshToken',
        signed:false,
    },
    sign:{
        expiresIn:'10m'
    },
})

app.register(fastifyCookie)


app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)



app.setErrorHandler((error,_,reply)=>{
if(error instanceof ZodError){
    return reply
    .status(400)
    .send({message:'validation error ', issues:error.format()})
}

if(env.NODE_ENV != "production"){
    console.error(error)
}else{
    //TODO: Here we should  log to an  external tool like datadog/NewRelic/Sentry
}

return reply.status(500).send({message:'internal server error'})
})
