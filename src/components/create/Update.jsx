import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl, Typography } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0,
    },
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
    createdDate: new Date(),
};

const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { account } = useContext(DataContext);

    const url =
        post.picture ||
        'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                }
            } catch (error) {
                console.error('Error while Editing the post', error);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append('file', file);

                try {
                    const response = await API.uploadFile(data);
                    setPost((prevPost) => ({ ...prevPost, picture: response.data.url }));
                } catch (error) {
                    console.error('Error occurred while uploading the image', error);
                }
            }
        };

        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file, location.search, account.username]);

    const handleImageClick = () => {
        window.open(post.picture, '_blank');
    };

    const updateBlogPost = async () => {
        try {
            if (!post.title || !post.description) {
                setError('Title and description are required.');
                return;
            }

            setLoading(true);
            let response = await API.updatePost(post);
            if (response.isSuccess) {
                navigate(`/details/${id}`);
            }
        } catch (error) {
            console.error('ERROR IN POSTING:: Update', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setPost((prevPost) => ({ ...prevPost, [e.target.name]: e.target.value }));
        setError(null);
    };

    return (
        <Container>
            <Image src={url} alt="post" onClick={handleImageClick} />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField
                    value={post.title}
                    onChange={(e) => handleChange(e)}
                    name="title"
                    placeholder="Title"
                />
                {loading ? (
                    <Button variant="contained" color="primary" disabled>
                        Updating...
                    </Button>
                ) : (
                    <Button onClick={() => updateBlogPost()} variant="contained" color="primary">
                        Update
                    </Button>
                )}
            </StyledFormControl>
            {error && <Typography color="error">{error}</Typography>}
            <Textarea
                minRows={5}
                placeholder="Space you Seek..."
                name="description"
                onChange={(e) => handleChange(e)}
                value={post.description}
            />
        </Container>
    );
};

export default Update;
