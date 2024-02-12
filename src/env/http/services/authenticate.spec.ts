import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryUserRepository } from '@/env/repositories/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvelidCredentialsError } from './erros/invelid-credentials-error';


let usersRepository:InMemoryUserRepository
let sut: AuthenticateUseCase


describe('Authenticate use case', ()=>{

    beforeEach(()=>{
         usersRepository= new InMemoryUserRepository
         sut = new AuthenticateUseCase(usersRepository)
    })


    it('Should be able to authenticate', async () => {
      
        
        await usersRepository.create({
            name:'Arlindo Cruz',
            email:'SOCORRO@exemple.com',
            password_hash: await hash('123456',6),
        })



            const {user}= await sut.execute({
            
                email:'SOCORRO@exemple.com',
                password:'123456',
            })
            
                expect(user.id).toEqual(expect.any(String))
        
    })

    it('Should not be able to authenticate with wrong email', async () => {
  
                
        await usersRepository.create({
            name:'Arlindo Cruz',
            email:'SOCORRO@exemple.com',
            password_hash: await hash('123456',6),
        })
        
        await expect(()=>sut.execute({
            
            email:'SOCORRO@exemple.com',
            password:'123123',
        })
        ).rejects.toBeInstanceOf(InvelidCredentialsError)

        
    })

    it('Should not be able to authenticate with wrong password', async () => {

        await expect(()=>sut.execute({
            
            email:'SOCORRO@exemple.com',
            password:'123456',
        })
        ).rejects.toBeInstanceOf(InvelidCredentialsError)

        
    })


    });
    


