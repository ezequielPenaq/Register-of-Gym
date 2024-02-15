
import { Gym } from "@prisma/client"
import { GymsRepository } from "@/env/repositories/gyms-repository"

interface SearchGymsUseCaseRequest{
query: string,
page:number
}
interface SearchGymsUseCaseResponse{
    gyms: Gym[]
}

    export class SearchGymUseCase{
        constructor(private gymRepository: GymsRepository,){}
        

        async  execute({query,page}:SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse>{
               
          const gyms= await this.gymRepository.searchMany(
            query,
            page)



                return {gyms}
        }
    }


