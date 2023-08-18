import React,{useContext} from 'react';
import { ApiContext } from '../context/ApiContext';
import { Grid } from '@mui/material';
import {GoMail} from 'react-icons/go';
import {BsFillPeopleFill} from 'react-icons/bs';
import Profile from './Profile';
import ProfileManager from './ProfileManager';
import Ask from './Ask';
import InboxDM from './InboxDM';

const Main = () => {

    const{profiles,profile,askList,askListFull,inbox} = useContext(ApiContext)
    const filterProfiles = profiles.filter(prof=>{return prof.id !== profile.id})
    const listProfiles = filterProfiles && (
        filterProfiles.map((filprof)=><Profile key={filprof.id} profileData={filprof} 
        askData = {askListFull.filter(ask=>{return(filprof.userPro === ask.askFrom) || (filprof.userPro === ask.askTo)})}/>)
    )

  return (
    <Grid container>
        <Grid item xs={4}>
            <div className="app-profiles">
                {listProfiles}
            </div>
        </Grid>
        <Grid item xs={4}>
            <div className="app-details">
                <ProfileManager/>
            </div>
            <h3 className="title-ask"><BsFillPeopleFill className="badge"/>Approval request List</h3>
            <div className="app-details">
                <ul>
                    {profile.id && askList.map(ask=><Ask key={ask.id} ask={ask}
                    prof={profiles.filter(item=>{return item.userPro === ask.askFrom})}/>)}
                </ul>
             
            </div>
        </Grid>
        <Grid item xs={4}>
            <h3><GoMail className="badge"/>DM Inbox</h3>
            <div className="app-dms">
                <ul>
                    {profile.id && inbox.map(dm=><InboxDM key={dm.id} dm={dm}
                     prof={profiles.filter(item=>{return item.userPro === dm.sender})}/>)}
                </ul>
            </div>
        </Grid>
    </Grid>
  )
}

export default Main