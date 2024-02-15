import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/env/repositories/in-memory/in-memory-checkIns-repository';
import { GetUserMatricsUseCase } from './get-user-metrics';

let checkInsRepository: InMemoryCheckInsRepository;
let sut:  GetUserMatricsUseCase;

describe('Get user metrics use case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new GetUserMatricsUseCase(checkInsRepository);
    });

    it('Should be able to get checkIns count from metrics', async () => {
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        });
        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        });

  
        const {  checkInsCount} = await sut.execute({
            userId: 'user-01',
  
        });

  
        expect( checkInsCount).toEqual(2);
  
    });
});
