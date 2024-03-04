import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeValidateCheckInUseCase } from '../../services/factories/make-validate-checkIn-use-case';

export async function validate(request: FastifyRequest, reply: FastifyReply) {
    const validateCheckInParamsSchema = z.object({
        checkInID: z.string().uuid(),
    });

    const { checkInID } = validateCheckInParamsSchema.parse(request.params);

    const validateCheckInUseCase = makeValidateCheckInUseCase();

    await validateCheckInUseCase.execute({
        checkInID,
    });

    return reply.status(204).send();
}
