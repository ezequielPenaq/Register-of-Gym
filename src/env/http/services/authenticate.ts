import { usersRepository } from "@/env/repositories/users-repository";
import { InvelidCredentialsError } from "./erros/invelid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest{
    email: string
    password: string 
}

interface AuthenticateUseCaseResponse{
    user : User
}

export class AuthenticateUseCase {
    constructor(
        private usersRepository: usersRepository

    ){}
            async execute ({
                email,
                password,
                }:AuthenticateUseCaseRequest):Promise<AuthenticateUseCaseResponse> {
                    const  user = await this.usersRepository.findByEmail(email)

                        if(!user){
                            throw new InvelidCredentialsError
                        }
                const doesPasswordMatches = await compare(password, user.password_hash)
                        if(!doesPasswordMatches){
                            throw new InvelidCredentialsError
                        }

                return {
                    user,
                }

            }

}