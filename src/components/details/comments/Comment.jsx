import { useContext, useState } from 'react';
import { Typography, Box, styled, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { API } from '../../../service/api';
import { DataContext } from '../../../context/DataProvider';

const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  margin-right: 20px;
`;

const StyledDate = styled(Typography)`
  font-size: 14px;
  color: #878787;
`;

const DeleteIcon = styled(Delete)`
  margin-left: auto;
  cursor: pointer;
`;

const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const removeComment = async () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await API.deleteComment(comment._id);
      if (response.isSuccess) {
        setToggle((prevState) => !prevState);
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error('Error on removing the comments ', error);
    }
  };

  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {comment.name === account.username && <DeleteIcon onClick={removeComment} />}
      </Container>
      <Typography>{comment.comments}</Typography>

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this comment?</Typography>
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
    </Component>
  );
};

export default Comment;
