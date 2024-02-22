import { GetUserMatricsUseCase } from "../get-user-metrics"
import { PrismaCheckInsRepository } from "@/env/repositories/prisma/prisma-check-ins-repository"

export function makeGetUserMetricsUseCase(){
    const checkInsRepository=new PrismaCheckInsRepository
    const useCase= new GetUserMatricsUseCase(checkInsRepository)

    return useCase
}