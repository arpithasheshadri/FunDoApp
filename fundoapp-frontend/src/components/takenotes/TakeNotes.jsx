import React,{useState} from 'react'
import IconButtons from '../icons/IconButtons';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Button} from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import UserService from '../../services/UserService';

const userService = new UserService();


export default function TakeNotes(props) {
    const [checked, setChecked] = React.useState(false);
    const [title,setTitle] = React.useState("");
    const [content,setContent] = React.useState("");
    const [color, setColor] = React.useState("#121212");
    const [archive, setArchive] = React.useState(false);
    const [collaborators, setCollaborators] = React.useState([]);
    

    const open = () => {
        setChecked(true);
    }
    const handleArchiveState = () =>{
        setArchive(true);
       
    }
    const handleAddCollaborator = (collab) => {
        setCollaborators([...collaborators,collab]);
        console.log(collaborators);
    }
    const addnotes = () => {
        var data = {};
        data['title'] = title;
        data['userId'] = localStorage.getItem("id");
        data['description'] = content;
        data['color'] = color;
        data['isArchived'] = archive;
        data['isDeleted'] = false;
        data['collaberators'] = collaborators;
        let config = {
            headers: {
                'Authorization': localStorage.getItem("id"),
            }
        }
        console.log(data);
        userService.addNotes("/notes/addNotes",data,config)
        .then(()=>{
            console.log("Notes Added");
            props.displayAfterAdd();
            setTitle("");
            setContent("");
            setColor("#121212");
            setArchive(false);
            setCollaborators([]);
            close();
        })
        .catch((err)=>{
            console.log(err);
        });
        
    }
    const close = () => {
        setChecked(false);
            
    }
    React.useEffect(() => {
        if(archive){
        addnotes();
        }
     }, [archive]);
    
    const takenotes = (
        <Box sx={{display:'flex'}}>
            <InputBase
                placeholder="Title"
                sx={{flexGrow:'1'}}
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
            />
            <IconButton><PushPinOutlinedIcon/></IconButton>
        </Box>
    );
    return (
        <div>
            <Box className="takenote-box" sx={{display:'flex', flexDirection:'column' ,width: '50%', marginLeft: '25%', justifyContent:'space-between'}}>
                <Paper sx={{padding:'5px 20px 5px 20px', borderRadius:'10px', border:'1px solid',backgroundColor: color }}>
                    <Collapse in={checked}>{takenotes}</Collapse>
                    <Box sx={{display: 'flex'}}>
                    <InputBase
                        placeholder="Take a note... "
                        sx={{flexGrow:'1', padding:'10px'}}
                        multiline
                        maxRows={30}
                        onFocus={open}
                        fullWidth
                        value={content}
                        sx={{flexGrow:1, padding: '20px 0'}}
                        onChange={(e)=> setContent(e.target.value)}
                    />
                    <Collapse in={!checked}>
                        <Box sx={{display: 'flex',marginTop: '10px'}}>
                            <IconButton><CheckBoxOutlinedIcon /></IconButton>
                            <IconButton><BrushOutlinedIcon /></IconButton>
                            <IconButton><ImageOutlinedIcon /></IconButton> 
                        </Box>
                    </Collapse>
                    </Box>
                    <Box >
                    <Collapse in={checked}>
                        <Box display='flex' marginBottom={'10px'}>
                             {  collaborators ?
                             collaborators.map((cred)=>(
                                <Box display={'flex'}>
                                    <span style={{border: '1px solid',borderRadius: '50%',padding: '12px',marginLeft: '10px',fontWeight: 'bold', cursor: 'pointer',backgroundColor: '#e3af12' }}>{cred.firstName.charAt(0)}</span>
                                </Box>
                                ))
                                : ''                        
                            }
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButtons mode="create" setColor={setColor} addNotes={addnotes} handleAddCollaborator={handleAddCollaborator}  handleArchiveState={handleArchiveState} /*callEffect={callEffect} setArchive={setArchive}*//>
                        <Button onClick={addnotes} size="small" sx={{color: 'white',textTransform: 'none', fontWeight: 'bolder', fontSize: '0.875rem'}}>Close</Button>
                        </Box>
                    </Collapse>
                    </Box>
                </Paper>
            </Box>
        </div>
    )
}
