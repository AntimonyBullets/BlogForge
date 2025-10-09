import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/database'
import { Container, PostCard } from '../components/index';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        databaseService.getAllPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        })
    })
    return (
        <div className='w-full py-8'>
            <Container>
                {
                    posts.map((post) => {
                        return (
                            <div key={post.$id}>
                                <PostCard {...post} />
                            </div>
                        )
                    })
                }
            </Container>
        </div>
    )
}

export default AllPosts