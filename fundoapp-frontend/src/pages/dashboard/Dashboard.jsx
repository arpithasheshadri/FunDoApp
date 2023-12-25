import React, { Component ,useEffect, useState} from 'react'
import Header from '../../components/header/Header'
import './Dashboard.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import UserService from '../../services/UserService';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Archives from '../archives/Archives'
import Trash from '../trash/Trash'
import Notes from '../notes/Notes'
import Search from '../search/Search';
import { Context } from '../../context/Context';

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

export default function Dashboard() {  
    const [searchWord, setSearchWord] = useState("");
    
    return (
        <div>
            <ThemeProvider theme={theme}>
            <Context.Provider value={[searchWord, setSearchWord]}>
                <Header />
                        <Switch>
                            <Route exact path="/dashboard" component={Notes}/>
                            <Route exact  path="/dashboard/archive" component={Archives}/>
                            <Route exact path="/dashboard/trash" component={Trash}/>
                            <Route exact path="/dashboard/search" component={Search}/>
                        </Switch>
            </Context.Provider>
            </ThemeProvider>
        </div>
    )
}


