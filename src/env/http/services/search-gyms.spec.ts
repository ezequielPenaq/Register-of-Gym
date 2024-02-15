import { beforeEach, describe, expect, it } from 'vitest';


import { inMemoryGymRepository } from '@/env/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymUseCase } from './search-gyms';

let gymsRepository: inMemoryGymRepository;
let sut: SearchGymUseCase


describe('Search Gyms  use case', () => {
    beforeEach(async () => {
        gymsRepository = new inMemoryGymRepository();
        sut = new SearchGymUseCase(gymsRepository);
    });

    it('Should be able to search for gyms', async () => {
        await gymsRepository.create({
         title:'Drakula Steel',
         description:null,
         phone:null,
         latitude:-22.7438447,                                              
         longitude:-47.3291217,
       
        });
        await gymsRepository.create({
        title:'VanHelsing Building',
        description:null,
        phone:null,
        latitude:-22.7438447,                                              
        longitude:-47.3291217,
      
        });

  
        const {  gyms} = await sut.execute({
         query:'Drakula Steel',
         page: 1
        });

  
        expect( gyms).toHaveLength(1);
        expect( gyms).toEqual([
       expect.objectContaining({title:'Drakula Steel'}),
       
        ]);
    });

    it('Should be able to fetch paginated gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({    
                title: `VanHelsing Building ${i}`,
                description: null,
                phone: null,
                latitude: -22.7438447,
                longitude: -47.3291217,
            });
        }
    
        const { gyms } = await sut.execute({
            query: 'VanHelsing Building',
            page: 2
        });
    
        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'VanHelsing Building 21' }),
            expect.objectContaining({ title: 'VanHelsing Building 22' })
        ]);
    });
    
});
