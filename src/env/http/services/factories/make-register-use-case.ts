import { PrismaUsersRepository } from "@/env/repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../usecase"

export function makeRegisterUseCase(){
    const usersRepository=new PrismaUsersRepository
    const registerUseCase= new RegisterUseCase(usersRepository)

    return registerUseCase
}