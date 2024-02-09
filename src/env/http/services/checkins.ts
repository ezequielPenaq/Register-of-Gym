import { Checkin } from "@prisma/client";
import { CheckInsRepository } from "@/env/repositories/checkins-repository";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
}

interface CheckInUseCaseResponse {
    checkIn: Checkin;
}

export class CheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute({
        userId,
        gymId,
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkInOnsameDay = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date(),
        )

        if(checkInOnsameDay){
            throw new Error
        }


        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        });

        return {
            checkIn,
        };
    }
}