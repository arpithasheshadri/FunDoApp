import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import IconButton from '@mui/material/IconButton';

import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UserService from '../../services/UserService';

const userService = new UserService();

const options = ['Delete note', 'Add label', 'Add drawing','Make a copy','Show checkboxes','copy to Google Docs'];

export default function MoreIcon(props) {
  const [open, setOpen] = React.useState(false);
  
  const anchorRef = React.useRef(null);
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleMenuClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleMenuItemClick = (event, index) => {
    if(index==0){
      if(props.mode == "update"){  
        props.setDelete(true);          
        let data = props.note;
        let config = {
            headers: {
                'Authorization': localStorage.getItem("id"),
            }
        }
        userService.trashNotes("/notes/trashNotes",data,config)
        .then(()=>{
            console.log("deleted successfully");
            props.displayAfterUpdate();
            props.handleClose();
            setOpen(false);
        })
        .catch((err)=>{
            console.log(err);
        });
      }
    }
    
  };

  return (
    <>
         <IconButton ref={anchorRef} onClick={handleToggle}><MoreVertOutlinedIcon/></IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        style={{zIndex: 1500}}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleMenuClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
