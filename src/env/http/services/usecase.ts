import { usersRepository } from "@/env/repositories/users-repository"

import { hash } from "bcryptjs"
import { UserAlreadyExistError } from "./erros/user-already-exist"
import { User } from "@prisma/client"

interface RegisterUseCaseRequest{
    name:string,
    email:string,
    password:string
}
interface RegisterUseCaseResponse{
    user: User
}

    export class RegisterUseCase{
        constructor(private usersRepository: usersRepository,){}
        

        async  execute({name,email,password}:RegisterUseCaseRequest): Promise<RegisterUseCaseResponse>{
                 const password_hash= await hash(password,6)
                     const userWithSameEmail=await this.usersRepository.findByEmail(email)



            if(userWithSameEmail){
                throw new UserAlreadyExistError()
            }
        
            // const prismaUsersRepository= new PrismaUserRepository()
               const user= await this.usersRepository.create({
                    name,
                    email,
                    password_hash,
                    
            
                })
                return {user,}
        }
    }


