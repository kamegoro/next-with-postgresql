import type { NextPage } from 'next'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import axios from 'axios'
import { Post } from '@prisma/client'

export const getServerSideProps: GetServerSideProps = async context => {
  let posts: Post[] | undefined = undefined;
  const res = await axios.get(`http://localhost:3000/api/post`);
  if (res.status === 200) {
    const json: Post[] = await res.data;
    if(json) {
      posts = json;
    }
  }

  return {
    props: { posts }
  }
}


const Home: NextPage = ({ posts }) => {
  const [title, setTitle] = useState<string>(``);
  const [content, setContent] = useState<string>(``);


  return (
    <div className='w-full my-10 mx-auto'>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='max-w-5xl m-auto'>
        <h1 className='font-bold text-3xl mb-8 flex justify-center'>
          Blog App
        </h1>

        <div className='border-b-2 pb-8 border-black'>
          <h3 className='text-2xl font-bold mb-6'>ブログを投稿する</h3>
          <div>
            <p className='mb-2'>ブログタイトル</p>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
          </div>
          <div>
            <p className='mb-2'>投稿内容</p>
            <textarea className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={content} onChange={(e) => setContent(e.currentTarget.value)} />
          </div>

          <button className='w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>送信</button>
        </div>

        <div className='mt-6'>
          {posts.map((v, i) => {
            return (
              <div key={i} className="bg-red-300 p-6">
                <p>{v.title}</p>
                <p>{v.content}</p>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Home
