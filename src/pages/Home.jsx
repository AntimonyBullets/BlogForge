import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/database';
import { Container, PostCard } from '../components/index'

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        databaseService.getAllPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        })
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center mt-[30px]">
                <Container>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    )
}

export default Home