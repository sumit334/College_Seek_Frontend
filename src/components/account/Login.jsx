import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Logo from '../../web_images/Logo.png';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 250,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0',
    borderRadius: '5px',
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div,
    & > button,
    & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #fb641b;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const loginInitialValues = {
    username: '',
    password: '',
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ setUserAuthenticated }) => {
    const { setAccount } = useContext(DataContext);

    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');
    const [account, toggleAccount] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // New loading state

    const navigate = useNavigate();

    useEffect(() => {
        setError('');
    }, [login]);

    useEffect(() => {
        setError('');
        setLogin(loginInitialValues);
        setSignup(signupInitialValues);
    },[account]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const toggleSignup = () => {
        setError('');
        toggleAccount(account === 'signup' ? 'login' : 'signup');
        setLogin(loginInitialValues);
        setSignup(signupInitialValues);
    };

    const loginUser = async () => {
        if (!login.username || !login.password) {
            setError('Please fill in all fields correctly again! Something went wrong');
            return;
        }
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login.username);
        if (!isValidEmail) {
            setError('Please enter a valid email ID');
            return;
        }
        setError('');
        setLoading(true); // Set loading state to true during login request
        try {
            let response = await API.userLogin(login);
            if (response.isSuccess) {
                setError('');
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({ name: response.data.name, username: response.data.username });
                setUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigate('/');
            }
        } catch (error) {
            setError('No such Email ID or, Password exists! Please Try Again');
        } finally {
            setLoading(false); // Set loading state back to false after login attempt
        }
    };

    const signupUser = async () => {
        if (!signup.name || !signup.username || !signup.password) {
            setError('Please fill in all fields');
            return;
        }
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signup.username);
        if (!isValidEmail) {
            setError('Please enter a valid Email ID');
            return;
        }
        setError('');
        const isValidPassword = signup.password.length >= 8;
        if (!isValidPassword) {
            setError('Password must be at least 8 characters long');
            return;
        }
        setError('');
        setLoading(true); // Set loading state to true during signup request
        try {
            let response = await API.userSignup(signup);
            if (response.isSuccess) {
                setError('');
                setSignup(signupInitialValues);
                toggleAccount('login');
            }
        } catch (error) {
            setError('Something went wrong! Please Try Again');
        } finally {
            setLoading(false); // Set loading state back to false after signup attempt
        }
    };

    const handleButtonClick = () => {
        window.open('https://sumitspassgenius.netlify.app/', '_blank');
    };

    return (
        <Component>
            <Box>
                <Image src={Logo} alt="Seek" />
                {account === 'login' ? (
                    <Wrapper>
                        <TextField
                            variant="standard"
                            value={login.username}
                            onChange={(e) => onValueChange(e)}
                            name="username"
                            label="Enter Email ID"
                        />
                        <TextField
                            variant="standard"
                            value={login.password}
                            onChange={(e) => onValueChange(e)}
                            name="password"
                            label="Enter Password"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                ),
                            }}
                        />

                        {error && <Error>{error}</Error>}
                        {loading ? (
                            <Button variant="contained">
                                Logging In
                            </Button>
                        ) : (
                            <LoginButton variant="contained" onClick={() => loginUser()}>
                                Login
                            </LoginButton>
                        )}
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>
                            Create an account
                        </SignupButton>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <TextField
                            variant="standard"
                            value={signup.username}
                            onChange={(e) => onInputChange(e)}
                            name="username"
                            label="Enter Email ID"
                        />
                        <TextField
                            variant="standard"
                            value={signup.password}
                            onChange={(e) => onInputChange(e)}
                            name="password"
                            label="Enter Password"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                ),
                            }}
                        />
                        <TextField
                            variant="standard"
                            value={signup.name}
                            onChange={(e) => onInputChange(e)}
                            name="name"
                            label="Enter Name"
                        />
                        <Button onClick={handleButtonClick}>Generate Password</Button>

                        {error && <Error>{error}</Error>}
                        {loading ? (
                            <Button variant="contained">Signing Up</Button>
                        ) : (
                            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
                        )}
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <LoginButton variant="contained" onClick={() => toggleSignup()}>
                            Already have an account
                        </LoginButton>
                    </Wrapper>
                )}
            </Box>
        </Component>
    );
};

export default Login;