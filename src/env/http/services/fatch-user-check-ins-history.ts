import { Checkin } from "@prisma/client";
import { CheckInsRepository } from "@/env/repositories/checkins-repository";



interface FatchUserCheckInsHistoryUseCaseRequest {
    userId: string;
    page:number
  
}

interface FatchUserCheckInsHistoryUseCaseResponse {
    checkIn: Checkin []
}

export class FatchUserCheckInsHistoryUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    
        ) {}

    async execute({
        userId,
        page
    
    }:  FatchUserCheckInsHistoryUseCaseRequest): Promise< FatchUserCheckInsHistoryUseCaseResponse> {
        const checkIn = await this.checkInsRepository.finManyByUserId(userId,page)


        return {
            checkIn,
        };
    }
}