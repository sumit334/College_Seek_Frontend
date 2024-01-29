import React, { useState, useEffect } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { styled, Box, Typography, IconButton } from '@mui/material';

const images = [
    'https://images.pexels.com/photos/2305442/pexels-photo-2305442.jpeg',
    'https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg',
    'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
    'https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg',
    'https://res.cloudinary.com/collegeseek/image/upload/v1706034008/bjbc31va9mwqildibprn.png',
];

const Image = styled(Box)`
    width: 100%;
    background: url(${props => props.src}) center/cover no-repeat #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1;
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
    padding: 8px 16px;
    border-radius: 8px;
`;

const Banner = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const nextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <Image src={images[currentImageIndex]}>
            <Heading>Seek Space</Heading>
            <SubHeading>College Seek</SubHeading>
            <IconButton onClick={prevImage} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#FFFFFF' }}>
                <ArrowBack />
            </IconButton>
            <IconButton onClick={nextImage} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#FFFFFF' }}>
                <ArrowForward />
            </IconButton>
        </Image>
    );
};

export default Banner;
