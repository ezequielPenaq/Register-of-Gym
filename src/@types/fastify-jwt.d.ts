import '@fastify/jwt'
    declare module '@fastify/jwt'{
       export interface fastifyJwT{
            user:{
               sub:string
            }
        }
    }