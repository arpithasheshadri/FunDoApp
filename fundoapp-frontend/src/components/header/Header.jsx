import * as React from 'react';
import { useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import { Context } from '../../context/Context';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import InputBase from "@mui/material/InputBase";
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import auth from '../../auth';
//create constant and store history

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#757575",
    marginRight: theme.spacing(100),
    marginLeft: 20,
    minWidth: "10%",
    overflowX: 'hidden',
    [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(50),
        width: "auto"
    }
    // ,
    // [theme.breakpoints.up("md")]: {
    //   marginLeft: theme.spacing(10),
    //   width: "20%"
    // },
    // [theme.breakpoints.up("lg")]: {
    //   marginLeft: theme.spacing(10),
    //   width: "50%"
    // },
    // [theme.breakpoints.up("xl")]: {
    //   marginLeft: theme.spacing(10),
    //   width: "20%"
    // }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "#fafafa",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 65, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch"
        }
    }
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "black",
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function MiniDrawer(props) {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchWord, setSearchWord] = useContext(Context);

  const handleLogoutPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleItem = (index) => {
  
    if(index==0){
      history.push('/dashboard');
    }
    else if(index==3){
      history.push('/dashboard/archive');
    }
    else if(index==4){
      history.push('/dashboard/trash');
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    auth.logout(()=>{
      history.push("/");
    })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"/>
          <Typography variant="h5" component="div" fontWeight="bolder" >
            Keep
          </Typography>
          <Search onClick={()=>history.push("/dashboard/search")}>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e)=> setSearchWord(e.target.value)}
                />
          </Search>
                <AppsOutlinedIcon fontSize="large"
                style={{
                    marginLeft: 10,
                    marginRight: 5,
                    // cursor: "pointer",
                    // zIndex: 3000,
                }} />
                <IconButton><AccountCircleOutlinedIcon onClick={handleLogoutPopover} fontSize="large" 
                style={{
                    marginLeft: 10,
                    marginRight: 5,
                    // cursor: "pointer",
                    // zIndex: 3000,
                }} /></IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        </DrawerHeader>
        <List>
          {['Notes', 'Reminders', 'Edit labels', 'Archive','Trash'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
              {index === 0 ? (
                    <LightbulbOutlinedIcon onClick={()=>{handleItem(index)}}/>
                    ) : index === 1 ? (
                    <NotificationsNoneOutlinedIcon />
                    ) : index === 2 ? (
                    <EditOutlinedIcon />
                    ) : index === 3 ? (
                    <ArchiveOutlinedIcon onClick={()=>{handleItem(index)}}/>
                    ) : (
                    <DeleteOutlineOutlinedIcon onClick={()=>{handleItem(index)}}/>
                    )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
        <DrawerHeader />
        
      </Box>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography sx={{display: 'flex',flexDirection:'column', paddingLeft:'80px',paddingRight: '80px',paddingTop: '20px', textAlign: 'center' }}>
        <Avatar sx={{width: 95,height: 95,fontWeight: 'bold',backgroundColor: '#B28745',color: '#f1f1f1',marginBottom: '50px',marginLeft: '15px'}}>{localStorage.getItem("fullname").charAt(0)}</Avatar>
        <span style={{fontWeight: 'bold'}}>{localStorage.getItem("fullname")}</span>
        <span style={{marginBottom: '20px'}}>{localStorage.getItem("email")}</span>
        <Button onClick={handleLogout} variant="outlined" sx={{color: 'white',textTransform: 'none', fontWeight: 'bolder',borderColor: '#f1f1f1',borderRadius: 25, border: '1px solid',marginBottom:'30px',
        ':hover':{
          borderColor:"#f1f1f1",
        },
      }}>Logout</Button>
        </Typography>
      </Popover>
    </Box>
  );
}

