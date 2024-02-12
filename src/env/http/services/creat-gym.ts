
import { Gym } from "@prisma/client"
import { GymsRepository } from "@/env/repositories/gyms-repository"

interface creatGymUseCaseRequest{
title:string,
description:string | null,
phone:string | null,
latitude: number,
longitude:number,

}
interface creatGymUseCaseResponse{
    gym: Gym
}

    export class creatGymrUseCase{
        constructor(private gymRepository: GymsRepository,){}
        

        async  execute({title,description,phone,latitude,longitude}:creatGymUseCaseRequest): Promise<creatGymUseCaseResponse>{
               
          const gym= await this.gymRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        })
                return {gym,}
        }
    }


