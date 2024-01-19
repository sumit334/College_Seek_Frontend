import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  styled,
  Box,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogActions,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DataContext } from '../../context/DataProvider';
import Logo from '../../web_images/Logo.png';

const Component = styled(AppBar)`
  background: #ffffff;
  color: black;
`;

const Container = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  margin-left: 10px; /* Adjust margin for better responsiveness */
`;

const Navigation = styled(Box)`
  display: flex;
  align-items: center;

  & > a {
    padding: 10px 15px;
    color: #000;
    text-decoration: none;
    transition: background-color 0.3s;
    border-radius: 10px;

    &:hover {
      background-color: #e0e0e0;
    }

    &.active {
      background-color: #4caf50;
      color: white;
    }
  }
`;

const Image = styled('img')({
  maxHeight: '50px', // Adjust the maximum height as needed
  marginLeft: '50px',
});

const ProfileContainer = styled(Box)`
  display: flex;
  align-items: center;
  position: relative;

  .logoutButton {
    display: none;
    position: absolute;
    top: 30px;
    right: 0;
    background-color: black;
    color: white; /* Set color to white */
    padding: 5px;
    border-radius: 5px;
  }

  &:hover .logoutButton {
    display: block;
  }

  &:hover .profileIcon {
    color: #4caf50; /* Change color to your desired color */
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useContext(DataContext);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // State for controlling the Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  // State for controlling the Logout confirmation dialog
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Toggle Drawer state
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Open the Logout confirmation dialog
  const openLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  // Close the Logout confirmation dialog
  const closeLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  // Perform Logout action
  const handleLogout = () => {
    closeLogoutDialog();
    navigate('/login');
  };

  // Drawer content
  const drawerContent = (
    <List>
      <ListItem>
        <IconButton color="inherit" className="profileIcon">
          <AccountCircleIcon />
        </IconButton>
        <Typography variant="subtitle1">Logged In: {account.username}</Typography>
      </ListItem>
      <ListItem button component={Link} to="/" onClick={toggleDrawer}>
        <ListItemText primary="HOME" />
      </ListItem>
      <ListItem button component={Link} to="/about" onClick={toggleDrawer}>
        <ListItemText primary="ABOUT" />
      </ListItem>
      <ListItem button component={Link} to="/contact" onClick={toggleDrawer}>
        <ListItemText primary="CONTACT" />
      </ListItem>
      <ListItem button onClick={openLogoutDialog}>
        <ListItemText primary="LOGOUT" />
        <LogoutIcon />
      </ListItem>
    </List>
  );

  return (
    <Component>
      <Container>
        {isSmallScreen && (
          <>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
              {drawerContent}
            </Drawer>
          </>
        )}
        <Image src={Logo} alt="Seek" />
        {!isSmallScreen && (
          <>
            <Navigation>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                HOME
              </Link>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                ABOUT
              </Link>
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                CONTACT
              </Link>
            </Navigation>
            <ProfileContainer>
              <Typography variant="subtitle1">Logged In: {account.username}</Typography>
              <IconButton color="inherit" className="profileIcon" onClick={openLogoutDialog}>
                <AccountCircleIcon />
              </IconButton>
              <Button onClick={openLogoutDialog} className="logoutButton">
                Logout
              </Button>
            </ProfileContainer>
          </>
        )}
      </Container>

      {/* Logout confirmation dialog */}
      <Dialog open={logoutDialogOpen} onClose={closeLogoutDialog}>
        <DialogTitle>Confirm logout?</DialogTitle>
        <DialogActions>
          <Button onClick={closeLogoutDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Component>
  );
};

export default Header;
