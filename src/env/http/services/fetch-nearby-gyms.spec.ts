import { beforeEach, describe, expect, it } from 'vitest';
import { inMemoryGymRepository } from '@/env/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: inMemoryGymRepository;
let sut: FetchNearByGymsUseCase

describe('Fetch nearby gyms  use case', () => {
    beforeEach(async () => {
        gymsRepository = new inMemoryGymRepository();
        sut = new FetchNearByGymsUseCase(gymsRepository);
    });

    it('Should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
         title:'NearGym',
         description:null,
         phone:null,
         latitude:-22.7438447,                                              
         longitude:-47.3291217,
       
        });
        await gymsRepository.create({
        title:'Far Gym',
        description:null,
        phone:null,
        latitude:-27.0610928,                                              
        longitude:-49.5229501,
      
        });

  
        const {  gyms} = await sut.execute({
            userLatitude: -22.7438447,
             userLongitude:-47.3291217,
        });

  
        expect( gyms).toHaveLength(1);
        expect( gyms).toEqual([
       expect.objectContaining({title:'NearGym'}),
       
        ]);
    });

    
});
