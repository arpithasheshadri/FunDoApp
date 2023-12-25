import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import CircleIcon from '@mui/icons-material/Circle';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import UserService from '../../services/UserService';
import IconButton from '@mui/material/IconButton';

const userService = new UserService();

export default function Palette(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const handleColor = (newColor) => {
    props.setColor(newColor);
    if (props.mode == "update") {
      let data = props.note;
      data['color'] = newColor;
    let config = {
        headers: {
            'Authorization': localStorage.getItem("id"),
        }
    }
    userService.updateNotes("/notes/changeNotesColor",data,config)
    .then(()=>{
        console.log("Color changed successfully");
        props.displayAfterUpdate();
    })
    .catch((err)=>{
        console.log(err);
    });
    }
  };

  const colors = ['#121212','#632a2a','#ad7b23','#b3b346','#597d47','#378c6d','#498a8a','#324163','#503273','#82247c','#754834','#8a8988'];
  return (
    <Box >
      <Popper open={open} anchorEl={anchorEl}  placement={placement} transition
      style={{zIndex: 2000}}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{width: '100%',zIndex: 1500 }}>
              <Box display="grid" gridTemplateColumns="repeat(4,1fr)">
              {colors.map((color)=>(
                <IconButton><CircleIcon onClick={()=>handleColor(color)} fontSize="large" sx={{color: color}} /></IconButton>
              ))}
                </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
          <IconButton onClick={handleClick('top-start')}><PaletteOutlinedIcon /></IconButton>
    </Box>
  );
}
