import React,{useContext} from 'react';
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
    button:{
        margin:theme.spacing(1),
    },
}))

const Profile = ({profileData,askData}) => {
    const classes = useStyles()
    const {newRequestFriend,profile} = useContext(ApiContext)

    const newRequest = () => {
        const askUploadData = new FormData()
        askUploadData.append("askTo",profileData.userPro)
        newRequestFriend(askUploadData)
    };

  return (
    <Card style={{position:'relative',display:'flex',marginBottom:10}}>

    {profileData.img ?
        <CardMedia style={{minWidth:100}} image={profileData.img}/>:
        <CardMedia style={{minWidth:100}} image="http://127.0.0.1:8000/media/image/null.png"/>}

        <CardContent style={{padding:5}}>
            <Typography variant="h6">{profileData.nickname}</Typography>
            <Typography>{profileData.created_on}</Typography>
            {!askData[0] && profile.id ? 

            <Button size="small" className={classes.button} variant="contained" color="primary" onClick={()=>newRequestFriend()}>Ask as Friend</Button>
            :<Button size="small" className={classes.button} variant="contained" color="primary" disabled>Ask as Friend</Button> }
        </CardContent>
    </Card>
  )
}

export default Profile;