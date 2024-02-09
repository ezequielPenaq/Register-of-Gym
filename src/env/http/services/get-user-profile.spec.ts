import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryUserRepository } from '@/env/repositories/in-memory/im-memory-user-repository'
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFound } from './erros/resource-not-found';


let usersRepository:InMemoryUserRepository
let sut:  GetUserProfileUseCase


describe('Get User profile  use case', ()=>{

    beforeEach(()=>{
         usersRepository= new InMemoryUserRepository
         sut = new GetUserProfileUseCase(usersRepository)
    })


    it('Should be able to get user profile', async () => {
      
        
        const CreatedUser=await usersRepository.create({
            name:'Arlindo Cruz',
            email:'SOCORRO@exemple.com',
            password_hash: await hash('123456',6),
        })



            const {user}= await sut.execute({
                userID: CreatedUser.id,
            
            })
            
                expect(user.name).toEqual('Arlindo Cruz')
        
    })

    it('Should not be able to get user profile with wrong Id', async () => {
  
                
        await usersRepository.create({
            name:'Arlindo Cruz',
            email:'SOCORRO@exemple.com',
            password_hash: await hash('123456',6),
        })
        
        await expect(()=>sut.execute({
        userID:'Non-existing-id'    
        
        })
        ).rejects.toBeInstanceOf(ResourceNotFound)

        
    })

  


    });
    


