import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%;
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: '',
};

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'; //dummy user image

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                }
            } catch (error) {
                console.error('Error getting the comment data ', error);
            }
        };
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value,
        });
    };

    const addComment = async () => {
        try {
            if (!comment.comments.trim()) {
                console.warn('Comment is empty. Not Echoing.');
                return;
            }

            setLoading(true); // Set loading state to true during posting
            let response = await API.newComment(comment);

            if (response.isSuccess) {
                setComment(initialValue);
            }

            setToggle((prevState) => !prevState);
        } catch (error) {
            console.error('Error on adding the comments ', error);
        } finally {
            setLoading(false); // Set loading state back to false after posting attempt
        }
    };

    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />
                <StyledTextArea
                    minRows={5}
                    placeholder="Want to Echo something?"
                    onChange={(e) => handleChange(e)}
                    value={comment.comments}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                    disabled={loading} // Disable button when posting to prevent multiple clicks
                    endIcon={<SendIcon />}
                >
                    {loading ? 'Echoing' : 'Echo'}
                </Button>
            </Container>
            <Box>
                {comments &&
                    comments.length > 0 &&
                    comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                    ))}
            </Box>
        </Box>
    );
};

export default Comments;
