import { Box, styled, Typography } from '@mui/material';
// import { GitHub, Instagram, Email, Language } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Crafted by the inventive hands of Sumit Agarwal</Typography>
                <Text variant="h5">I'm a pre-final year student at Jadavpur University, specializing in Information Technology.
                    I'm an avid learner with hands-on experience in website development and project implementation.<br />
                    I am a highly motivated and results-driven professional with a robust background in Data 
                    Structures and Algorithms (DSA). My true passion lies in the realm of Web Development, 
                    where I am recognized for my meticulous attention to detail, outstanding problem-solving skills, 
                    and effective communication abilities. In the vast landscape of programming languages, I wield 
                    JAVA with expertise.<br />
                    I am not just a developer; I am a perpetual learner, always poised to embrace new challenges 
                    and technologies. My commitment to continuous growth fuels my adaptability and quick learning.
                    <br />
                    Beyond the coding world, I harbor a keen interest in the Finance sector. I am not only a 
                    coder but also a dedicated Web Developer based in India. <br />
                    I specialize in crafting dynamic and interactive digital experiences using the powerful
                    MERN stack — combining React.js for front-end brilliance, Node.js and Express.js for
                    robust server-side applications, and MongoDB for seamless database management. As a MERN
                    Stack Developer, I am dedicated to creating sophisticated and user-centric solutions that
                    seamlessly blend creativity with cutting-edge technology. 
                </Text>
                <Typography variant="h3">College Seek Website</Typography>
                <Text variant='h5'>
                    Embarking on the College Space Project, our journey is a testament to innovation and
                    collaborative exploration. In this dynamic venture, we strive to create a space that fosters 
                    creativity, learning, and a sense of community. Guided by a passion for excellence,
                    our project aims to redefine the educational landscape, providing a vibrant and inclusive
                    space for students to thrive. Together, we are shaping a future where education transcends 
                    boundaries and cultivates an environment that inspires growth and intellectual curiosity.
                    <br /> <br />
                    Let's embark on the journey of innovation together!
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;
