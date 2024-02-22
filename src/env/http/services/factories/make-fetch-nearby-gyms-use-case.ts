
import { FetchNearByGymsUseCase } from "../fetch-nearby-gyms"
import { PrismaGysmsRepository } from "@/env/repositories/prisma/prisma-gyms-repository"

export function makeFetchNearbyGymsUseCase(){
    const gymsRepository=new PrismaGysmsRepository
    const useCase= new FetchNearByGymsUseCase(gymsRepository)

    return useCase
}