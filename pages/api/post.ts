import type { NextApiRequest, NextApiResponse } from 'next';
import type { Post } from '@prisma/client';
import { PostRespository } from '../../repository/postRepositories';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Post[] | Post | { message: string }>
    ) {

    switch(req.method) {
        case `GET`:
            const posts = await PostRespository.getAllPosts();
            res.status(200).json(posts);
            break

        case `POST`:
            const body = await req.body();
            if (!(body && body.title && body.content)) {
                res.status(400).json({ message: `title and content must be present` });
                break
            }
            const postData = body as { title: string, content: string }
            const addPost = await PostRespository.addPost(postData.title, postData.content);
            res.status(200).json(addPost)
            break

        default:
            res.status(405).end()
            break
    }
}