import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import MainFeaturedPost2 from '../../components/socialmedia/MainFeaturedPost2';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function SocialMedia() {
  const navigate = useNavigate();
  const [socialMedias, setSocialMedias] = useState([]);

  const getAllSocialMedia = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/social/`);
      setSocialMedias(res.data);
    } catch (error) {
      console.error(error);
      // Handle errors and show toast notifications if needed
    }
  };

  useEffect(() => {
    getAllSocialMedia();
  }, []);

  

  return (
    <div>
      <MainFeaturedPost2 />
      <div className='mt-7'>
        <Grid container direction="row" spacing={2}>
          {socialMedias.filter((socialMedia) => socialMedia.status !== 'pending').map((socialMedia) => (
            <Grid item xs={12} md={6} key={socialMedia._id}>
              <CardActionArea component="div">
                <Card sx={{ display: 'flex' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      {socialMedia.platform}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {socialMedia.url}
                    </Typography>
                    {/* Conditionally render Facebook icon if URL contains 'facebook' */}
                    {socialMedia.url.includes('facebook') && <FacebookIcon color="primary" />}
                    {socialMedia.url.includes('twitter') && <TwitterIcon color="primary" />}
                    {socialMedia.url.includes('instagram') && <InstagramIcon color="primary" />}
                    {socialMedia.url.includes('linkedin') && <LinkedInIcon color="primary" />}
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
