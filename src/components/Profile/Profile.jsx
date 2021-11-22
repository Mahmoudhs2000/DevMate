import React from 'react';
import { Button, Chip, Container, Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


const Profile = ({User}) => {
    return <>
        <Container maxWidth='sm' style={{textAlign: 'center'}}>
            <Typography variant='h5' style={{color :'rgb(249, 117, 58)'}} >Member Profile</Typography>
            <Typography variant='h3' >{User.username}</Typography>
            <Divider style={{margin: '20px'}} />
            <Typography variant='h5' style={{margin: '20px 0'}} >Tech Stack</Typography>
            {
                    User.stack.map((s,i)=> <Chip key={i} label={s} style={{margin: '0 10px',fontWeight: 'bold'}} />)
            }
            <Typography variant='h5' style={{margin: '20px 0'}} >Team</Typography>
            {
                User.team.inTeam 
                 ? <Typography variant='h5' style={{margin: '8px 0' , fontWeight: 'bold' }} >{ User.team.teamName }</Typography>
                 : <Typography variant='h5' style={{margin: '8px 0'}} >
                     You'r Not In A Team   
                     <br/>
                     <Button variant='outlined' color='primary' style={{margin: '20px 0'}}  >
                         <Link to='/Teams/Join' >Join Now</Link>
                     </Button>
                   </Typography>
            }
        </Container>
    </>
};

export default Profile;