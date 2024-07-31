import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { Fastfood, Home, ShoppingCart} from '@material-ui/icons';
// import ReviewsIcon from '@mui/icons-material/Reviews';
import {  Newspaper, ShoppingBag } from '@mui/icons-material';
import ShareIcon from '@mui/icons-material/Share';

export const adminListItems = (
  <React.Fragment>
    <Link to={'/payments'}>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Payments" />
      </ListItemButton>
    </Link>

    <Link to={'/review'}>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Review Management" />
      </ListItemButton>
    </Link>

    <Link to={'/admin/userMNG'}>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Manage Users" />
      </ListItemButton>
    </Link>
    <Link to={'/admin/socialmedia'}>
      <ListItemButton>
        <ListItemIcon>
          <ShareIcon />
        </ListItemIcon>
        <ListItemText primary="SocialMedia MNG" />
      </ListItemButton>
    </Link>
    {/* <Link to={'/admin/addNews'}>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary=" Add News/Posters" />
      </ListItemButton>
    </Link> */}
    <Link to={'/admin/newsMNG'}>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary=" MNG News/Posters" />
      </ListItemButton>
    </Link>
    <Link to={'/admin/orders'}>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary=" Orders" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const customerListItems = (
  <React.Fragment>
  <Link to={'/items'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  
  <Link to={'/transactions'}>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingBag />
      </ListItemIcon>
      <ListItemText primary="My Transactions" />
    </ListItemButton>
  </Link>
  <Link to={'/cart'}>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Cart" />
    </ListItemButton>
  </Link>
  <Link to={'/news'}>
    <ListItemButton>
      <ListItemIcon>
        <Newspaper />
      </ListItemIcon>
      <ListItemText primary="Discount News/Posters" />
    </ListItemButton>
  </Link>
  <Link to={'/social'}>
    <ListItemButton>
      <ListItemIcon>
        <ShareIcon />
      </ListItemIcon>
      <ListItemText primary="Social Media" />
    </ListItemButton>
  </Link>
  
  </React.Fragment>
);


export const guestListItems = (
  <React.Fragment>
  <Link to={''}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  <Link to={'/items'}>
    <ListItemButton>
      <ListItemIcon>
        <Fastfood />
      </ListItemIcon>
      <ListItemText primary="Items" />
    </ListItemButton>
  </Link>
  <Link to={'/news'}>
    <ListItemButton>
      <ListItemIcon>
        <Newspaper />
      </ListItemIcon>
      <ListItemText primary="Discount News/Posters" />
    </ListItemButton>
  </Link>
  <Link to={'/social'}>
    <ListItemButton>
      <ListItemIcon>
        <ShareIcon />
      </ListItemIcon>
      <ListItemText primary="Social Media" />
    </ListItemButton>
  </Link>
  
  </React.Fragment>
);

export const deliveryListItems = (
  <React.Fragment>
  <Link to={'/delivery/home'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  <Link to={'/delivery/addDriver'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Manage Drivers" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);


export const driverListItems = (
  <React.Fragment>
  <Link to={'/driver'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  
  </React.Fragment>
);