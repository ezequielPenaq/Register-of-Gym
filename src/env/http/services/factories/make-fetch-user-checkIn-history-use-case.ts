import { FatchUserCheckInsHistoryUseCase } from "../fatch-user-check-ins-history"
import { PrismaCheckInsRepository } from "@/env/repositories/prisma/prisma-check-ins-repository"

export function makeFetchCheckinHistorysUseCase(){
    const checkInsRepository=new PrismaCheckInsRepository
    const useCase= new FatchUserCheckInsHistoryUseCase(checkInsRepository)

    return useCase
}