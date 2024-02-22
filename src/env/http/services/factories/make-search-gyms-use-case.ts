
import { SearchGymUseCase } from "../search-gyms"
import { PrismaGysmsRepository } from "@/env/repositories/prisma/prisma-gyms-repository"

export function makeSearchGymsUseCase(){
    const gymsRepository=new PrismaGysmsRepository
    const useCase= new SearchGymUseCase(gymsRepository)

    return useCase
}