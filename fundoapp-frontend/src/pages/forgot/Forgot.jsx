import React, { Component } from 'react'
import './Forgot.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserService from '../../services/UserService';
//import History from '../../history/History';
const userService = new UserService();


export default class Forgot extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            emailError: false,
        };
    }
    isValidated = () => {
        let isError = false;
        const errors = this.state;

        errors.emailError = this.state.email !== "" ? false : true;

        this.setState({
            ...errors
        });
        return (isError = errors.emailError);
    };

    changeValue = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };

    next = () => {
        var isValid = this.isValidated();
        console.log(this.state)
        if(!isValid){
            console.log("validation successful");
            let data = {
                "email":this.state.email,
            };
            userService.Forgot("/user/reset",data)
            .then(()=>{
                const auth = localStorage.getItem('id');
                const url = "/reset-password/"
                console.log("successfully found email");
                //History.push(`${url}${auth}`);
                this.props.history.push(`${url}${auth}`);
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    };
    render() {
        return (
            <div className="forgot-container">
                <div className="forgot-content">
                    <div className="logo-content">
                            <span style={{color:'blue'}}>F</span>
                            <span style={{color:'red'}}>u</span>
                            <span style={{color:'orange'}}>n</span>
                            <span style={{color:'green'}}>D</span>
                            <span style={{color:'blue'}}>o</span>
                    </div>
                    <div className="forgot-content-heading">Find your email</div>
                    <div className="forgot-content-description">Enter your phone number or recovery email</div>
                    <div className="forgot-email-field">
                        <TextField fullwidth id="emailid" name="email" label="Phone number or email" variant="outlined" margin="dense"
                        error={this.state.emailError}
                        onChange={(e) => this.changeValue(e)}
                        helperText={this.state.emailError ? "Enter an email address" : ""}
                        size="medium" sx={{width: '100%'}} />
                    </div>
                    <div className="forgot-button">
                        <Button size="medium" variant="contained" sx={{textTransform: 'none', fontWeight: 'bolder', fontSize: '0.875rem' ,float: 'right'}}onClick={this.next}>Next</Button>
                    </div>
                </div>
            </div>
        )
    }
}
