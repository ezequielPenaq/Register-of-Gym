import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import { InMemoryCheckInsRepository } from '@/env/repositories/in-memory/in-memory-checkIns-repository'
import { CheckInUseCase } from './checkins'
import { string } from 'zod'


let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase


describe('Check-in use case', ()=>{

    beforeEach(()=>{
        checkInsRepository= new InMemoryCheckInsRepository
        sut = new CheckInUseCase (checkInsRepository)


        vi.useFakeTimers()
    })

    afterEach(()=>{
        vi.useRealTimers()
    })


    it('Should be able to check in', async () => {
    


            const {checkIn}= await sut.execute({
             gymId: 'gym-01',
             userId: 'user-01'
            })
            
                expect(checkIn.id).toEqual(expect.any(String))
        
    })

    it('Should not be able to check in twice in same day', async () => {

        vi.setSystemTime(new Date(2022,0,20,8,0,0))
      
        await sut.execute({
         gymId: 'gym-01',
         userId: 'user-01'
        })
        
        
       
        
            await expect(()=> sut.execute({
                gymId: 'gym-01',
                userId: 'user-01'
               })).rejects.toBeInstanceOf(Error)
    
})

it('Should not be able to check in twice but in different days', async () => {

    vi.setSystemTime(new Date(2022,0,22,8,0,0))
  
    await sut.execute({
     gymId: 'gym-01',
     userId: 'user-01'
    })
    
    vi.setSystemTime(new Date(2022,0,23,8,0,0))


    const{ checkIn} =await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01'
     })

     expect(checkIn.id).toEqual(expect.any(string))
   
    


})



   
    });
    


