import {beforeEach, describe, expect, it} from 'vitest'

import { inMemoryGymRepository } from '@/env/repositories/in-memory/in-memory-gyms-repository';
import { creatGymrUseCase } from './creat-gym';



let gymsRepository: inMemoryGymRepository
let sut:creatGymrUseCase


describe('Create gym use case', ()=>{

    beforeEach(()=>{
        gymsRepository= new inMemoryGymRepository
        sut = new creatGymrUseCase(gymsRepository)
    })


    it('Should be able to create gym', async () => {
      

            const {gym}= await sut.execute({
                title:'Dracula Gym',
                description:null,
                phone:null,
                latitude:-22.7438447,                                              
                longitude:-47.3291217,
              
            })
            
                expect(gym.id).toEqual(expect.any(String))
        
    })


   
    });
    


