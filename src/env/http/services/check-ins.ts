import { Checkin } from "@prisma/client";
import { CheckInsRepository } from "@/env/repositories/checkins-repository";
import { GymsRepository } from "@/env/repositories/gyms-repository";
import { ResourceNotFound } from "./erros/resource-not-found";
import { getDistanceBetweenCordinates } from "@/utils/get-distance-between-coordinates";


interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: Checkin;
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository
        
        
        ) {}

    async execute({
        userId,
        gymId,
        userLatitude,
        userLongitude
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId)

        if(!gym){
            throw new ResourceNotFound()
        }

        const distance = getDistanceBetweenCordinates(
            {latitude:userLatitude, longitude:userLongitude},
            {latitude:gym.latitude.toNumber(),
             longitude:gym.longitude.toNumber()}
        )

                const MAX_DISTANCE_In_Kilometers=0.1

                if(distance>MAX_DISTANCE_In_Kilometers){
                    throw new Error()
                }

            
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