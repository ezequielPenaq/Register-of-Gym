import {describe, expect, it} from 'vitest'
import { RegisterUseCase } from './usecase'

import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/env/repositories/in-memory/im-memory-user-repository'
import { UserAlreadyExistError } from './erros/user-already-exist'

describe('Register use case', ()=>{

it('Should hash user password upon registration', async () => {
    const usersRepository= new InMemoryUserRepository
    const registerUseCase = new RegisterUseCase(usersRepository)
   

 const {user}=await registerUseCase.execute({
    name:'Arnaldo ',
    email:'SOCORRO@exemple.com',
    password:'123456',

})
    const isPasswordCorrectlyHashed = await compare(
        '123456',
        user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
})
  

})

it('Should not to be able to register with same email twice ', async () => {
    const usersRepository= new InMemoryUserRepository
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'Guts@exemple.com'
   

    await registerUseCase.execute({
    name:'Arnaldo ',
    email,
    password:'123456',

})

expect(()=>{
    registerUseCase.execute({
        name:'Arnaldo ',
        email,
        password:'123456',
        })

    }).rejects.toBeInstanceOf(UserAlreadyExistError)

})
  




