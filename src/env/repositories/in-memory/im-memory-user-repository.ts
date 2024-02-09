import { Prisma, User } from "@prisma/client";
import { usersRepository } from "../users-repository";



export class InMemoryUserRepository implements usersRepository{
  
    public items: User [] = []
    findById(id: string): Promise<{ id: string; name: string; email: string; password_hash: string; created_at: Date; } | null> {
      throw new Error("Method not implemented.");
    } 
    async findById(id: string){
      const user =this.items.find(item=>item.id===id)

      if(!user){
        return null
      }
      return user
    }






    async findByEmail(email: string){
      const user =this.items.find(item=>item.email===email)

      if(!user){
        return null
      }
      return user
    }


    async create(data: Prisma.UserCreateInput) {
        const user ={
            id: 'user-1',
            name:data.name,
            email:data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }
        this.items.push(user)
            return user
    }

}
