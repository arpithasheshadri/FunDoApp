import React from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import IconButtons from '../icons/IconButtons';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import {Button} from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from "@mui/material/DialogActions";
import UserService from '../../services/UserService';
import Avatar from '@mui/material/Avatar';
import './Display.scss';

const userService = new UserService();
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  })); 
  const theme = createTheme({
    palette:{
        mode:'dark',
    }
  });

export default function Display(props) {
    console.log(props);
    const [checked, setChecked] = React.useState(false);
    const [pop, setOpen] = React.useState(false);
    const [title,setTitle] = React.useState("");
    const [content,setContent] = React.useState("");
    const [noteid,setId] = React.useState("");
    const [color, setColor] = React.useState("#121212");
    const [archive, setArchive] = React.useState(false);
    const [deleted, setDelete] = React.useState(false);
    const [noteobj, setNote] = React.useState({});
    const handleClickOpen = (note) => {
        setNote(note);
        setOpen(true);
        setTitle(note.title);
        setId(note.id);
        setContent(note.description);
        setColor(note.color);
        setArchive(note.isArchive);
        setDelete(note.isDeleted);
    };
    const updateNote = () => {
        // let data = {
        //     noteId:noteid,
        //     title: title,
        //     description: content,
        // };
        let data = noteobj;
        data['title'] = title;
        data['description'] = content;
        let config = {
            headers: {
                'Authorization': localStorage.getItem("id"),
            }
        }
        userService.updateNotes("/notes/updateNotes",data,config)
        .then(()=>{
            console.log("Notes updated successfully");
            props.displayAfterUpdate();
        })
        .catch((err)=>{
            console.log(err);
        });
        
    }
    const handleClose = () => {
        updateNote(); 
        setOpen(false);
    };
    
    const open = () => {
        setChecked(true);
    }
    const close = () => {
        setChecked(false);
    }
    const pinbutton = (         
            <IconButton><PushPinOutlinedIcon/></IconButton>
    ); 
  
//       React.useEffect(()=>{
//         handleClose();
//    },[archive]);
   
      console.log(noteobj)
    return (
        <div>
            <Box sx={{marginLeft: '10%', marginTop: '5%', marginRight: '10%'}} >
                <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }}>
                    {props.data.length != 0 ?
                    props.data.map((note)=>(
                        <Grid item xs={6} sm={3} md={2} >
                        <Item>
                            <div className="note">
                            <Box  sx={{display:'flex', flexDirection:'column'}}>                        
                            <Paper  variant="outlined" sx={{border:'0.1px solid', borderRadius:'10px', padding: '0 5px', wordWrap: 'break-word', backgroundColor: note.color }} >
                        
                            <Box sx={{fontSize:'16px', padding:'5px', fontWeight: 'bolder'}} onClick={()=>handleClickOpen(note)}>
                                 <div className="notes-title">{note.title}<div className="pin-icons">{pinbutton}</div></div>
                                 <div className="notes-content">{note.description}</div>
                            </Box>
                            <Box display='flex' marginBottom={'10px'}>
                             {  note ?
                             note.collaberators.map((cred)=>(
                                <Box display={'flex'}>
                                    <Avatar sx={{marginLeft: '10px',fontWeight: 'bold', cursor: 'pointer',backgroundColor: '#B28745',color: '#f1f1f1' }}>{cred.firstName.charAt(0)}</Avatar>
                                </Box>
                                ))
                                : ''                        
                            }
                            </Box>
                            <div className="icons">
                            <Box display='flex' justifyContent='space-between'>
                                <IconButtons note={note} mode="update" setColor={setColor} setDelete={setDelete} handleClose={handleClose} setArchive={setArchive} displayAfterUpdate = {props.displayAfterUpdate}/>
                            </Box>
                            </div>
                            </Paper>
                        </Box>
                        </div>
                        </Item>
                        </Grid>
                    )): 'Notes not found'}
                </Grid>
            </Box> 
            <Dialog open={pop} onClose={()=>handleClose}>
            <Box sx={{display:'flex', flexDirection:'column' ,width: '100%', justifyContent:'space-between'}}>
                <Paper sx={{padding:'5px 20px 5px 20px', borderRadius:'10px', border:'1px solid',backgroundColor: color }}>
                <Box>
                    <InputBase
                        defaultValue={title}
                        sx={{flexGrow:'1'}}
                        onChange={(e)=> setTitle(e.target.value)}
                    />
                    <InputBase
                        defaultValue={content}
                        sx={{flexGrow:'1', padding:'10px'}}
                        multiline
                        maxRows={30}
                        onFocus={open}
                        fullWidth
                        sx={{flexGrow:1, padding: '20px 0'}}
                        onChange={(e)=> setContent(e.target.value)}
                    />
                    </Box>
                    <Box display='flex' marginBottom={'10px'}>
                             {  noteobj.collaberators ?
                             noteobj.collaberators.map((cred)=>(
                                <Box display={'flex'}>
                                    <Avatar sx={{marginLeft: '10px',fontWeight: 'bold', cursor: 'pointer',backgroundColor: '#B28745', color: '#f1f1f1'}}>{cred.firstName.charAt(0)}</Avatar>
                                </Box>
                                ))
                                : ''                        
                            }
                            </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButtons mode="update" setColor={setColor} setArchive={setArchive} setDelete={setDelete} handleClose={handleClose} displayAfterUpdate = {props.displayAfterUpdate} note={noteobj}/>
                        <Button onClick={handleClose} size="small" sx={{color: 'white',textTransform: 'none', fontWeight: 'bolder', fontSize: '0.875rem'}}>Close</Button>
                    </Box>
                
                </Paper>
                </Box>
            </Dialog>           
        </div>
    )
}