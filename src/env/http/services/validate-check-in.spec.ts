import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import { InMemoryCheckInsRepository } from '@/env/repositories/in-memory/in-memory-checkIns-repository'
import { CheckInUseCase } from './check-ins'
import { inMemoryGymRepository } from '@/env/repositories/in-memory/in-memory-gyms-repository'
import { validateCheckInUseCase } from './validate-check-in'
import { date } from 'zod'
import { ResourceNotFound } from './erros/resource-not-found'


let checkInsRepository: InMemoryCheckInsRepository

let sut:validateCheckInUseCase

describe('Validate check-in use case', ()=>{

    beforeEach(async()=>{
        checkInsRepository= new InMemoryCheckInsRepository
        sut = new validateCheckInUseCase (checkInsRepository)

  

  


        vi.useFakeTimers()
    })

    afterEach(()=>{
        vi.useRealTimers()
    })


    it('Should be able to validate the check in', async () => {

            const createdCheckIn = await checkInsRepository.create({
                gym_id:'gym-01',
                user_id:'user-01'

            })
    
        

             const {checkIn}= await sut.execute({
                checkInID: createdCheckIn.id
            })
            
                expect(checkIn.validated_at).toEqual(expect.any(Date))
                expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
        
    })



    it('Should not be able to validate an inexistent the check in', async () => {

   
        await expect(()=>
             sut.execute({
            checkInID: 'inexisten check in Id',
        }),
        ).rejects.toBeInstanceOf(ResourceNotFound)
    
})


it('Should not be able to validate the check in after 20 minutes of its creation',async () => {
   vi.setSystemTime(new Date(2023, 0, 1, 13, 40 )) 
   const createdCheckIn = await checkInsRepository.create({
    gym_id:'gym-01',
    user_id:'user-01'

})
    const twentyOneMinutesInMs = 1000 *60 *21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    expect (()=>sut.execute({
        checkInID: createdCheckIn.id
    })).rejects.toBeInstanceOf(Error)


})


 });
    


