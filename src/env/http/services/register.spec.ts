import {beforeEach, describe, expect, it} from 'vitest'
import { RegisterUseCase } from './usecase'

import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/env/repositories/in-memory/im-memory-user-repository'
import { UserAlreadyExistError } from './erros/user-already-exist'

let usersRepository: InMemoryUserRepository
let sut:RegisterUseCase


describe('Register use case', ()=>{

    beforeEach(()=>{
         usersRepository= new InMemoryUserRepository
        sut = new RegisterUseCase(usersRepository)
    })


    it('Should be able to register', async () => {
      

            const {user}= await sut.execute({
                name:'Arnaldo ',
                email:'SOCORRO@exemple.com',
                password:'123456',
            })
            
                expect(user.id).toEqual(expect.any(String))
        
    })


    it('Should hash user password upon registration', async () => {
   
     const {user}=await sut.execute({
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

    it('should not be able to register with same email twice',async () => {

        const email ='SOCORO@exemple.com'

        await sut.execute({
            name:'Arnaldo',
            email,
            password:'123456',
        })

        await expect(
            sut.execute({
                name: 'Arnaldo',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistError);
    });
    


