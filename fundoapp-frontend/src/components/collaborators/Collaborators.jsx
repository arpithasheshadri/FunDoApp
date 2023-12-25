import React from 'react'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputBase,TextField } from '@mui/material';
import Box from '@mui/material/Box';
import UserService from '../../services/UserService';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Avatar from '@mui/material/Avatar';

import ClickAwayListener from '@mui/material/ClickAwayListener';

const userService = new UserService();

export default function Collaborators(props) {
    const [open, setOpen] = React.useState(false);
    const [searchedUser, setSearchedUser] = React.useState([]);
    const [collabUser, setCollabUser] = React.useState([]);
    const fullName = localStorage.getItem("fullname");
    const email = localStorage.getItem("email");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popperOpen, setPopperOpen] = React.useState(false);

  const handleClick = () => (event) => {
    setAnchorEl(event.currentTarget);
    setPopperOpen(true);
  };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCollabUser([]);
    };
    const handleMenuClose = () => {
        setPopperOpen(false);
        setSearchedUser([]);
      };
    const handleCollaborator = (data) => {
        if(props.mode == "create") {
            props.handleAddCollaborator(data);
        }
        if(props.mode=="update"){
            let config = {
                headers: {
                    'Authorization': localStorage.getItem("id"),
                }
            }
            console.log(props.note)
            userService.addCollaborator(`/notes/${props.note.id}/addCollaboratorsNotes`,data,config)
            .then((res)=>{
                console.log(res.data.data);
                console.log("retrieved users successfully"); 
                props.handleClose();  
                props.displayAfterUpdate(); 
                

            })
            .catch((err)=>{
                console.log(err);
            });
        }
    }
    const handleMenuItemClick = (event,index) => {
        console.log(collabUser);
        setCollabUser([...collabUser,searchedUser[index]])
        handleCollaborator(searchedUser[index]);
        console.log(collabUser);
    }
    const handleInput = (val) => {
        console.log(val.target.value)
        if(val.target.value !== ""){
            // let data = {
            //     "searchWord" : val.target.value
            // };
        let config = {
            headers: {
                'Authorization': localStorage.getItem("id"),
            }
        }
        userService.searchUser("/user/search",val.target.value,config)
        .then((res)=>{
            console.log(res.data);
            console.log("retrieved users successfully");
            setSearchedUser(res.data);            
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    }
    // console.log(props.note);
    return (
        <div>
        <IconButton onClick={handleClickOpen}>
        <PersonAddAltOutlinedIcon />
        </IconButton>
        <Dialog fullWidth open={open} onClose={handleClose} maxWidth="xs">
            <DialogTitle>Collaborators</DialogTitle>
            <DialogContent style={{margin: '5px'}}>
            <DialogContentText>
                <Box style={{display: 'flex',flexDirection: 'column',marginBottom: '10px'}}>
                    <Box display={'flex'} marginBottom={'10px'}>
                        <Avatar style={{marginRight: '10px',fontWeight: 'bold',backgroundColor: '#B28745',color: '#f1f1f1'}}>{fullName.charAt(0)}</Avatar>
                        <Box display='flex' flexDirection='column'>
                            <span style={{fontWeight: 'bold'}}>{fullName}<i>(owner)</i></span>
                            <span>{email}</span>
                        </Box>
                    </Box>
                    <Box display='flex' flexDirection='column' marginBottom={'10px'}>
                        { props.note ?
                        props.note.collaberators.map((cred)=>(
                            <Box display={'flex'} marginBottom={'10px'}>
                                <Avatar sx={{marginRight: '10px',fontWeight: 'bold', cursor: 'pointer',backgroundColor: '#B28745',color: '#f1f1f1' }}>{cred.firstName.charAt(0)}</Avatar>
                                <Box style={{display: 'flex', flexDirection: 'column'}}>
                                    <span style={{fontWeight: 'bold'}}>{cred.firstName} {cred.lastName}</span>
                                    <span>{cred.email}</span>
                                </Box>
                            </Box>
                        ))
                        : collabUser.map((cred)=>(
                            <Box display={'flex'} marginBottom={'10px'}>
                                <Avatar sx={{marginRight: '10px',fontWeight: 'bold', cursor: 'pointer',backgroundColor: '#B28745',color: '#f1f1f1' }}>{cred.firstName.charAt(0)}</Avatar>
                                <Box style={{display: 'flex', flexDirection: 'column'}}>
                                    <span style={{fontWeight: 'bold'}}>{cred.firstName} {cred.lastName}</span>
                                    <span>{cred.email}</span>
                                </Box>
                            </Box>
                        ))
                        
                        }
                    </Box>
                </Box>
            </DialogContentText>
            <Box style={{display: 'flex',justifyContent: 'space-around'}}>
            <span style={{border: '1px solid',borderRadius: '50%',padding: '10px', marginRight: '5px'}}><PersonAddAltOutlinedIcon /></span>
                <Popper open={popperOpen} anchorEl={anchorEl} placement="bottom-start" style={{zIndex: 2000}} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                            <ClickAwayListener onClickAway={handleMenuClose}>
                                <MenuList id="split-button-menu">
                                    {searchedUser.map((option, index) => (
                                        <MenuItem
                                        key={option}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                        {option.firstName} {option.lastName} &lt;{option.email}&gt;
                                        </MenuItem>
                                    ))}
                                 </MenuList>
                            </ClickAwayListener>
                            </Paper>
                            </Fade>
                            )}
                </Popper>
                        <InputBase
                            autoFocus
                            placeholder="Person or email to share with"
                            fullWidth
                            variant="standard"
                            onClick={handleClick()}
                            onChange={(val)=>{handleInput(val)}}
                        />
            </Box>
            </DialogContent>
            <DialogActions style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button onClick={handleClose} sx={{color: 'white',textTransform: 'none', fontWeight: 'bolder'}}>Cancel</Button>
            <Button onClick={handleClose} sx={{color: 'white',textTransform: 'none', fontWeight: 'bolder'}}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
