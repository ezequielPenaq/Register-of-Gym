import {FastifyRequest,FastifyReply} from 'fastify'
import {z} from 'zod'
import { makeFetchCheckinHistorysUseCase } from '../../services/factories/make-fetch-user-checkIn-history-use-case'


export  async function history(request:FastifyRequest,reply:FastifyReply){
    const checkInHistoryQuerySchema=z.object({
        
        page: z.coerce.number().min(1).default(1),
    })
    const {page}=checkInHistoryQuerySchema.parse(request.query)

    
            const FetchCheckinHistorysUseCase=makeFetchCheckinHistorysUseCase()


           const {checkIn}= await  FetchCheckinHistorysUseCase.execute({
                userId:request.user.sub,
                page
            })
        

        
            return reply.status(200).send({
                checkIn
            })
}