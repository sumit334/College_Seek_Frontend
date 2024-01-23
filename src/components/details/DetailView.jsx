import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './comments/Comments';

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

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4caf50 !important; /* Change to your desired color */
  }
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff5757; /* Change to your desired color */
  }
`;

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
  word-break: break-word;
`;

const Description = styled(Typography)`
  word-break: break-word;
`;

const Author = styled(Box)(({ theme }) => ({
  color: '#878787',
  display: 'flex',
  margin: '20px 0',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

const DetailView = () => {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const { account } = useContext(DataContext);
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const url =
    'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await API.getPostById(id);
        if (response.isSuccess) {
          setPost(response.data);
        }
      } catch (error) {
        console.error('Error displaying the post details', error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteBlog = async () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      let response = await API.deletePost(post._id);
      if (response.isSuccess) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error while deleting the post', error);
    }
  };

  const handleImageClick = () => {
    window.open(post.picture, '_blank');
  };

  const handleFileClick=()=>{
    window.open(post.fileUp, '_blank');
  }

  return (
    <Container>
      <Image src={post.picture || url} alt="post" onClick={handleImageClick} />
      <Box style={{ float: 'right' }}>
        {account.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteIcon onClick={deleteBlog} color="error" />
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>
      <Author>
        <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography>
            Author: <span style={{ fontWeight: 600 }}>{post.username}</span>
          </Typography>
          <Typography>
            Download File: <CloudDownloadIcon onClick={handleFileClick}/> 
          </Typography>
        </Link>
        <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
      </Author>
      <Description>{post.description}</Description>
      <Comments post={post} />

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this Seek?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DetailView;
