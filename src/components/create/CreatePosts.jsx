import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl  } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';


const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    cursor: 'pointer',
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}


const CreatePosts=()=>{

    const navigate = useNavigate();
    const location = useLocation();

    const [post,setPost]=useState(initialPost);
    const [file,setFile]=useState('');

    const {account}=useContext(DataContext);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("file", file);

                try {
                    const response = await API.uploadFile(data);
                    // console.log("Cloudinary url from server: ",response.data.url);
                    setPost(prevPost => ({ ...prevPost, picture: response.data.url }));
                } catch (error) {
                    console.error("Error occurred while uploading the image", error);
                }
            }
        };

        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file, post.categories, location.search, account.username]);


    const handleImageClick = () => {
        // Open the image URL in a new tab
        window.open(post.picture, '_blank');
    };
    
    const savePost = async () => {
        try {
            let response=await API.createPost(post);
            if(response.isSuccess){
                navigate('/');
            }
        } catch (error) {
            console.error("ERROR IN POSTING:: CreatePost",error.message);
        }
    }

    const handleChange = (e) => {
        setPost(prevPost => ({ ...prevPost, [e.target.name]: e.target.value }));
    }
    

    return(
        <Container>
            <Image src={url} alt="post" onClick={handleImageClick} />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>
            <Textarea
                minRows={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
            />
        </Container>
    )
}

export default CreatePosts;
