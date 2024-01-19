import { useEffect, useState } from 'react';

import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { API } from '../../../service/api';

import Post from './Post';


const Posts = () => {

    const [posts, setPosts] = useState([]);
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => { 
            try {
                let response = await API.getAllPosts({ category : category || '' });
                if (response.isSuccess) {
                    setPosts(response.data);
                }
            } catch (error) {
                console.error("Error in fetching the getallpost API: ",error);
            }
        }
        fetchData();
    }, [category]);

    return(
        <>
            {
                posts?.length>0 ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12} key={post._id}>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : (
                    <>
                        <Box style={{color: 'red', margin: '15px 20px', fontSize: 18}}>
                            No SEEK is Available for Selected Category
                        </Box>
                        <Box style={{color: 'green', margin: '60px -320px', fontSize: 18}}>
                            Create SEEK To See
                        </Box>
                    </>
                )
            }
        </>
    )
}


export default Posts;