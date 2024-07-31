import React, { useState, useEffect } from 'react';
import MainFeaturedPost from '../../components/NewsFeed/MainFeaturedPost';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';

export default function DiscountNewsPoster() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  const getNews = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/news`);
      setNews(res.data);
    } catch (error) {
      console.error(error);
      // Handle errors and show toast notifications if needed
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const handleNewsClick = async (id) => {
    try {
      const res = await authAxios.get(`${apiUrl}/news/${id}`);
      const newsItem = res.data;
      // Redirect to view news page passing news item as state
      navigate(`/news/${id}`, { state: { newsItem } });
    } catch (error) {
      console.error(error);
      // Handle errors and show toast notifications if needed
    }
  };

  return (
    <div>
      <MainFeaturedPost />
      <div className='mt-7'>
        <Grid container direction="row" spacing={2}>
          {news.filter(news => news.status !== 'pending').map((news) => (
            <Grid item xs={12} md={6} key={news._id}>
              <CardActionArea component="div" onClick={() => handleNewsClick(news._id)}>
                <Card sx={{ display: 'flex' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      {news.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {news.updatedAt}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {news.description}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      Continue reading...
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{ height: 205, width: 180, display: { xs: 'none', sm: 'block' } }}
                    image={news.img}
                    alt={news.title}
                  />
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
