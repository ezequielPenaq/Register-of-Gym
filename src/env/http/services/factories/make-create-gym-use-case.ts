
import { creatGymrUseCase } from "../creat-gym"
import { PrismaGysmsRepository } from "@/env/repositories/prisma/prisma-gyms-repository"

export function makeCreateGymUseCase(){
    const gymsRepository=new PrismaGysmsRepository
    const useCase= new creatGymrUseCase(gymsRepository)

    return useCase
}