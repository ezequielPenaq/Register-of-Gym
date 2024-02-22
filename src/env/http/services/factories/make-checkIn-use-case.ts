import { PrismaGysmsRepository } from "@/env/repositories/prisma/prisma-gyms-repository"
import { CheckInUseCase } from "../check-ins"
import { PrismaCheckInsRepository } from "@/env/repositories/prisma/prisma-check-ins-repository"

export function makeCheckInUseCase(){
    const checkInsRepository=new PrismaCheckInsRepository
    const gumsRepository= new PrismaGysmsRepository
    const useCase= new CheckInUseCase(checkInsRepository,gumsRepository)

    return useCase
}