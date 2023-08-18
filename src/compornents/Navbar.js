import React from 'react';
import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { FiLogOut } from 'react-icons/fi';
import { withCookies } from 'react-cookie';

const StyledBadge = styled(Badge)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const StyledTypography = styled(Typography)({
  flexGrow: 1,
});

const Navbar = (props) => {
  const {askList,profiles} = useContext(ApiContext)
  const Logout = (event) => {
    props.cookies.remove('current-token');
    window.location.href = '/';
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <StyledTypography variant="h5">
          SNS App
        </StyledTypography>
        <StyledBadge 
                    badgeContent={askList.filter(ask=>{return (ask.approved === false && profiles.filter(item=>{return item.userPro === ask.askFrom})[0])}).length} 
                    color="secondary">
          <NotificationsIcon />
        </StyledBadge>
        <button className='signOut' onClick={Logout}>
          <FiLogOut />
        </button>
      </Toolbar>
    </AppBar>
  );
}

export default withCookies(Navbar);
