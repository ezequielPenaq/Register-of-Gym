import {describe, expect, it} from 'vitest'
import { InMemoryUserRepository } from '@/env/repositories/in-memory/im-memory-user-repository'
import { AuthenticateUseCase } from '../authenticate';
import { hash } from 'bcryptjs';
import { InvelidCredentialsError } from './invelid-credentials-error';


describe('Authenticate use case', ()=>{

    it('Should be able to authenticate', async () => {
        const usersRepository= new InMemoryUserRepository
        const sut = new AuthenticateUseCase(usersRepository)
        
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
        const usersRepository= new InMemoryUserRepository
        const sut = new AuthenticateUseCase(usersRepository)

                
        await usersRepository.create({
            name:'Arlindo Cruz',
            email:'SOCORRO@exemple.com',
            password_hash: await hash('123456',6),
        })
        
        expect(()=>sut.execute({
            
            email:'SOCORRO@exemple.com',
            password:'123123',
        })
        ).rejects.toBeInstanceOf(InvelidCredentialsError)

        
    })

    it('Should not be able to authenticate with wrong password', async () => {
        const usersRepository= new InMemoryUserRepository
        const sut = new AuthenticateUseCase(usersRepository)
        
        expect(()=>sut.execute({
            
            email:'SOCORRO@exemple.com',
            password:'123456',
        })
        ).rejects.toBeInstanceOf(InvelidCredentialsError)

        
    })


    });
    


