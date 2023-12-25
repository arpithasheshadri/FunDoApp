import React from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import MoreIcon from '../more/MoreIcon';
import Palette from '../palette/Palette';
import UserService from '../../services/UserService';
import Collaborators from '../collaborators/Collaborators';

const userService = new UserService();

export default function IconButtons(props) {

    const handleArchive = () => {
        if(props.mode=="create"){
            props.handleArchiveState();
            console.log("created archived notes");
        }
        if(props.mode == "update"){            
            let data = props.note;
            let config = {
                headers: {
                    'Authorization': localStorage.getItem("id"),
                }
            }
            userService.archiveNotes("/notes/archiveNotes",data,config)
            .then(()=>{
                console.log("archived successfully");
                props.handleClose();
                props.displayAfterUpdate();
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    };
    //console.log(props)
    
    return (
        <div>
            <Box sx={{display:'flex', justifyContent: 'space-between'}}>
            <IconButton><AddAlertOutlinedIcon/></IconButton>
            <IconButton>{props.mode=="create" ? <Collaborators mode="create" note={props.note} displayAfterUpdate = {props.displayAfterUpdate} handleAddCollaborator={props.handleAddCollaborator}/> : <Collaborators mode="update" handleClose={props.handleClose} note={props.note} displayAfterUpdate = {props.displayAfterUpdate} />} </IconButton>
            <IconButton>{props.mode=="create" ? <Palette mode="create" setColor={props.setColor} displayAfterUpdate = {props.displayAfterUpdate} note={props.note}/> : <Palette mode="update" setColor={props.setColor} displayAfterUpdate = {props.displayAfterUpdate} note={props.note} />}</IconButton>
            <IconButton><ImageOutlinedIcon/></IconButton>
            <IconButton><ArchiveOutlinedIcon onClick={handleArchive} /></IconButton>
            <MoreIcon mode="update" handleClose={props.handleClose} setDelete={props.setDelete} displayAfterUpdate = {props.displayAfterUpdate} note={props.note}/>
            </Box> 
            
        </div>
    )
}
