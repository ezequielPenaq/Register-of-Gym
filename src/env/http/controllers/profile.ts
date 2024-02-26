import {FastifyRequest,FastifyReply} from 'fastify'
import { makeGetUserProfileUseCase } from '../services/factories/make-get-user-profile-use-case'



export  async function profile (request:FastifyRequest,reply:FastifyReply){
   
 

     const getUserProfile=makeGetUserProfileUseCase()
     const  {user} = await getUserProfile.execute({
          userID: request.user.sub
     
        
     })
     console.log(request.user.sub)

            return reply.status(200).send({
               user:{
                    ...user,
                    password_hash:undefined,
               }
            })
}