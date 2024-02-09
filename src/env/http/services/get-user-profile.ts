import { usersRepository } from "@/env/repositories/users-repository";

import { User } from "@prisma/client";
import { ResourceNotFound } from "./erros/resource-not-found";

interface GetUserProfileUseCaseRequest{
 userID: string
}

interface GetUserProfileUseCaseResponse{
    user : User
}

export class GetUserProfileUseCase {
    constructor(
        private usersRepository: usersRepository

    ){}
            async execute ({
                userID
                }:GetUserProfileUseCaseRequest):Promise<GetUserProfileUseCaseResponse> {
                    const  user = await this.usersRepository.findById(userID)

                        if(!user){
                            throw new ResourceNotFound
                        }
             

                return {
                    user,
                }

            }

}