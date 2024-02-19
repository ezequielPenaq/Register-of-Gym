import { Checkin } from "@prisma/client";
import { CheckInsRepository } from "@/env/repositories/checkins-repository";
import { GymsRepository } from "@/env/repositories/gyms-repository";
import { ResourceNotFound } from "./erros/resource-not-found";
import { getDistanceBetweenCordinates } from "@/utils/get-distance-between-coordinates";
import { MaxNumberOfCheckinsError } from "./erros/max-number-of-checkins-errors";
import { MaxDistanceError } from "./erros/max-distance-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./erros/late-check-in-validation-error";


interface validateCheckInUseCaseRequest {
   checkInID: string
}
                                                    //validate
interface validateCheckInUseCaseResponse {
    checkIn: Checkin;
}

export class validateCheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
  
        
        
        ) {}

    async execute({
        checkInID
    }: validateCheckInUseCaseRequest): Promise<validateCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInID)

        if(!checkIn){
            throw new ResourceNotFound()
        }


        const distanceInMInutesFromCheckInCreation= dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes',
        )
        if(distanceInMInutesFromCheckInCreation > 20){
            throw new LateCheckInValidationError()
        }
     
        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)


        return {
            checkIn,
            
        }

    }
}