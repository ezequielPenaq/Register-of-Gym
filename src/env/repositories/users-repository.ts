import { Prisma,User } from "@prisma/client";
import { promises } from "dns";



export interface usersRepository{
    findByEmail(email:string): Promise<User | null>
    create(data:Prisma.UserCreateInput): Promise<User>
}