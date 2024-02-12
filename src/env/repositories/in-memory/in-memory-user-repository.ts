import { Prisma, User } from "@prisma/client";
import { usersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements usersRepository {
    public items: User[] = [];

    findById(id: string) {
        const user = this.items.find(item => item.id === id);
        return Promise.resolve(user || null);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email);
        return Promise.resolve(user || null);
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        };
        this.items.push(user);
        return user;
    }
}
