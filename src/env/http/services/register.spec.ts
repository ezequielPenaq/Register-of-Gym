import {describe, it,expect} from 'vitest'
import { RegisterUseCase } from './usecase'
import { PrismaUsersRepository } from '@/env/repositories/prisma/prisma-users-repository'

describe('Register use case', ()=>{

it('Should hash user password upon registration', async () => {
    const prismaUserRepository=new PrismaUsersRepository   
    const registerUseCase = new RegisterUseCase(prismaUserRepository)


 const {user}=await registerUseCase.execute({
    name:'zeca',
    email:'zecachave@exemple.com',
    password:'123456',

})
console.log(user.password_hash)
})
  

})

