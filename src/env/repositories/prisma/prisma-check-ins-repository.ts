import { Prisma } from "@prisma/client";
import { CheckInsRepository } from "../checkins-repository";
import { prisma } from "@/env/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository{
    async create(data: Prisma.CheckinUncheckedCreateInput) {
        const checkIn = await prisma.checkin.create({
            data,
        })
        return checkIn
    }
    async save(data: { id: string; created_at: Date; validated_at: Date | null; user_id: string; gym_id: string; }){
        const checkIn = await prisma.checkin.update({
            where:{
                id: data.id,
            },
            data: data
        })
        return checkIn
    }
    async findById(id: string) {
        const checkIn = await prisma.checkin.findUnique({
            where:{
                id
            }
        })
        return checkIn
    }
    async finManyByUserId(userId: string, page: number) {
        const checkIns= await prisma.checkin.findMany({
            where:{
                user_id:userId,
            },
            take:20,
            skip:(page - 1) * 20,
        })
        return checkIns
    }
    async countByUserId(userId: string) {
     const count = await prisma.checkin.count({
        where:{
            user_id: userId,
        }
     })
        return count
    }
    async findByUserIdOnDate(userId: string, date: Date) {
     const startOfTheDay =dayjs(date).startOf('date')
     const endtOfTheDay =dayjs(date).endOf('date')

    const  checkIn= await prisma.checkin.findFirst({
        where:{
            user_id: userId,
            created_at: {
                gte: startOfTheDay.toDate(),
                lte:endtOfTheDay.toDate()
            }
        }
    })
      return checkIn
    }
}