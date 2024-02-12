import { Checkin, Prisma} from "@prisma/client";

export interface CheckInsRepository{
    create(data:Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
    finManyByUserId(userId:string,page:number):Promise<Checkin[]>
    findByUserIdOnDate(userId:string, date:Date):Promise<Checkin | null>
}