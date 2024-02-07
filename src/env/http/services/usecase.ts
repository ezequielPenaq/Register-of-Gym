import { prisma } from "@/env/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest{
    name:string,
    email:string,
    password:string
}

export async function registerUseCase({
    name,email,password
}:RegisterUseCaseRequest): Promise<any>{
    const password_hash= await hash(password,6)
    const userWithSameEmail=await prisma.user.findUnique({
        where:{email,}
    })
    if(userWithSameEmail){
        throw new Error('Email already exist')
    }

await prisma.user.create({
data:{
    name,
    email,
    password_hash,
}
})
}