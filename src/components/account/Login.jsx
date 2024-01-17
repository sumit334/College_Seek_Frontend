import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { API } from '../../service/api';
import {DataContext} from '../../context/DataProvider';
import Logo from "../../web_images/Logo.png"

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
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
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
`

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};


const Login = ({setUserAuthenticated}) => {
    const {setAccount}=useContext(DataContext);

    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error,setError]=useState('');
    const [account, toggleAccount] = useState('login');
    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        setError('');
    }, [login])

    useEffect(() => {
        setLogin(loginInitialValues);
        setSignup(signupInitialValues);
        setError('');
    }, [account]);
    

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const toggleSignup = () => {
        // setError(''); // Reset the error state as well
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
        // setLogin(loginInitialValues);
        // setSignup(signupInitialValues);
    }
    

    const loginUser=async()=>{

        if (!login.username || !login.password) {
            setError('Please fill in all fields');
            return;
        }
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login.username);
        if (!isValidEmail) {
            setError('Please enter a valid email address');
            return;
        }
        setError('');   
        try{
            let response=await API.userLogin(login);
            if(response.isSuccess){
                setError('');   

                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({ name: response.data.name, username: response.data.username });
                
                setUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigate('/');
            }
        }
        catch(error){
            setError('No such username or, password exists');
        }
    }

    const signupUser=async()=>{

        if (!signup.name || !signup.username || !signup.password) {
            setError('Please fill in all fields');
            return;
        }

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signup.username);
        if (!isValidEmail) {
            setError('Please enter a valid email address');
            return;
        }
        setError('');

        const isValidPassword = signup.password.length >= 8;
        if (!isValidPassword) {
            setError('Password must be at least 8 characters long');
            return;
        }
        setError('');

        try{
            let response=await API.userSignup(signup);
            if(response.isSuccess){
                setError('');
                setSignup(signupInitialValues);
                toggleAccount('login');
            }
        }
        catch(error){
            setError('Something went wrong! Please check details');
        }
    }

    const handleButtonClick = () => {
        window.open('https://sumitspassgenius.netlify.app/', '_blank');
    };

    // useEffect(() => {
    //     setLogin(loginInitialValues);
    //     setSignup(signupInitialValues);
    //     setError('');
    // }, [account]);


    return (
        <Component>
            <Box>
                <Image src={Logo} alt="blog" />
                {
                    account === 'login' ?
                        <Wrapper>
                            {/*TODO: Error to be resolved that is occuring due to value and defaultValue conflict */}
                            <TextField 
                                variant="standard" 
                                defaultValue={login.username} 
                                onChange={(e) => onValueChange(e)} 
                                name='username' 
                                label='Enter Username' 
                            />
                            <TextField 
                                variant="standard" 
                                defaultValue={login.password} 
                                onChange={(e) => onValueChange(e)} 
                                name='password' 
                                label='Enter Password' 
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
                            <LoginButton variant="contained" onClick={()=> loginUser()}>Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper> 
                    :
                        <Wrapper>
                            <TextField 
                                variant="standard" 
                                onChange={(e) => onInputChange(e)} 
                                name='name' 
                                label='Enter Name' 
                            />
                            <TextField 
                                variant="standard" 
                                onChange={(e) => onInputChange(e)} 
                                name='username' 
                                label='Enter Username' 
                            />
                            <TextField 
                                variant="standard" 
                                onChange={(e) => onInputChange(e)} 
                                name='password' 
                                label='Enter Password' 
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
                            <Button onClick={handleButtonClick}>
                                Generate Password
                            </Button>

                            {error && <Error>{error}</Error>}
                            <SignupButton onClick={()=> signupUser()}>Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login