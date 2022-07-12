import prisma from '../libs/prisma';

export class PostRespository {
    static async getAllPosts() {
        return await prisma.post.findMany();
    }

    static async addPost(title: string, content: string) {
        return await prisma.post.create({
            data: { title, content }
        });
    }
}
