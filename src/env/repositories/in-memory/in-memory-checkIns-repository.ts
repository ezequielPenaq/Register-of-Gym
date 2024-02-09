import { Prisma, Checkin } from "@prisma/client";
import { CheckInsRepository } from "../checkins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: Checkin[] = [];


  async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay =dayjs(date).startOf('date')
        const endtOfTheDay =dayjs(date).endOf('date')


    const checkInOnsameDate = this.items.find(checkIn=>{
       const checkInDate = dayjs(checkIn.created_at)
       const isOnSameDate = 
       checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endtOfTheDay)
       
       
        return checkIn.user_id===userId && isOnSameDate 
    })
    
    if(!checkInOnsameDate){
        return null
    }
        
    
        return checkInOnsameDate

}



    async create(data: Prisma.CheckinUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        };
        this.items.push(checkIn);
        return checkIn;
    }
}