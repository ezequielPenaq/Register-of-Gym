import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/env/repositories/in-memory/in-memory-checkIns-repository';
import { FatchUserCheckInsHistoryUseCase } from './fatch-user-check-ins-history';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FatchUserCheckInsHistoryUseCase;

describe('Fetch user Check-in history use case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new FatchUserCheckInsHistoryUseCase(checkInsRepository);
    });

    it('Should be able to fetch check in history', async () => {
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        });
        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        });

  
        const {  checkIn} = await sut.execute({
            userId: 'user-01',
            page: 1,
        });

  
        expect( checkIn).toHaveLength(2);
        expect( checkIn).toEqual([
       expect.objectContaining({gym_id:'gym-01'}),
       expect.objectContaining({gym_id:'gym-02'})
        ]);
    });

    it('Should be able to fetch paginated check ins history', async () => {
       for(let i = 1;i <=22;i++){
        await checkInsRepository.create({
            gym_id: `gym-${ i}`,
            user_id: 'user-01',
        });
    

       }

  
        const {  checkIn} = await sut.execute({
            userId: 'user-01',
            page:2
        });

  
        expect( checkIn).toHaveLength(2);
        expect( checkIn).toEqual([
       expect.objectContaining({gym_id:'gym-21'}),
       expect.objectContaining({gym_id:'gym-22'})
        ]);
    });
});
