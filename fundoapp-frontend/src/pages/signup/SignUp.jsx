import React, { Component } from 'react'
import './SignUp.scss';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import UserService from '../../services/UserService';
// import History from '../../history/History'
const userService = new UserService();;

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            fName: "",
            lName: "",
            email: "",
            password: "",
            fNameError: false,
            lNameError: false,
            emailError: false,
            passwordError: false,
        };
    }
    isValidated = () => {
        let isError = false;
        const errors = this.state;

        errors.fNameError = this.state.fName !== "" ? false : true;
        errors.lNameError = this.state.lName !== "" ? false : true;
        errors.emailError = this.state.email !== "" ? false : true;
        errors.passwordError = this.state.password !== "" ? false : true;

        this.setState({
            ...errors
        });
        return (isError = errors.fNameError || errors.lNameError || errors.emailError || errors.passwordError);
    };
    handleClick = () => {
        //History.push('/')
        this.props.history.push("/");
    }

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
                "firstName": this.state.fName,
                "lastName": this.state.lName,
                "email":this.state.email,
                "password":this.state.password
            };
            userService.SignUp("/user/register",data)
            .then(()=>{
                console.log("successfully registered");
                // History.push('/dashboard')
                this.props.history.push("/");

            })
            .catch((err)=>{
                console.log(err);
            });
        }
    };
    render() {
        // redirec
        return (
            <div className="signup-container">
                <div className="form-container">
                    <div className="logo">
                        <span style={{color:'blue'}}>F</span>
                        <span style={{color:'red'}}>u</span>
                        <span style={{color:'orange'}}>n</span>
                        <span style={{color:'green'}}>D</span>
                        <span style={{color:'blue'}}>o</span>
                    </div>
                    <h1 className="form-heading">Create your Google Account</h1>
                    <div className="form">
                        <div className="name-field">
                            <TextField fullwidth id="first-name" name="fName" label="First name" variant="outlined" margin="dense" 
                                        size="small" error={this.state.fNameError}
                                        onChange={(e) => this.changeValue(e)}
                                        helperText={this.state.fNameError ? "Enter first name" : ""}
                                         sx={{ marginRight: '5px' }}/>
                            <TextField fullwidth id="last-name" name="lName" label="Last name" variant="outlined" margin="dense" 
                                        size="small" error={this.state.lNameError} 
                                        onChange={(e) => this.changeValue(e)}
                                        helperText={this.state.lNameError ? "Enter last name" : ""}
                                        sx={{ marginLeft: '5px' }}/>
                        </div>
                        <div className="email-field">
                            <TextField fullwidth id="email" name="email" label="Email" variant="outlined" margin="dense" 
                                        error={this.state.emailError}
                                        onChange={(e) => this.changeValue(e)}
                                        helperText={this.state.emailError ? "choose a Gmail address" : ""}
                                        size="small" sx={{width: '100%'}}/>
                        </div>
                        <div className="current-email">
                            <Button className="email-button" size="small" sx={{textTransform: 'none', fontWeight: 'bolder', fontSize: '0.875rem'}}>Use my current email address instead</Button>
                        </div>
                        <div className="password-field">
                            <TextField fullwidth id="password" name="password" label="Password" variant="outlined" margin="dense" type="password" 
                                        error={this.state.passwordError}
                                        onChange={(e) => this.changeValue(e)}
                                        helperText={this.state.passwordError ? "Enter a password" : ""}
                                        size="small" sx={{ marginRight: '5px' }}/>
                            <TextField fullwidth id="cpassword" label="Confirm" variant="outlined" margin="dense" type="password" size="small" sx={{ marginRight: '5px' }}/>
                            
                        </div>
                        <div className="password-helpertext">Use 8 or more characters with a mix of letters, numbers & symbols</div>
                        <div className="check-box">
                            <Checkbox />Show Password
                        </div>
                        <div className="signin-button">
                            <Button size="small" sx={{textTransform: 'none', fontWeight: 'bolder', fontSize: '0.875rem', marginRight:'8vw'}}
                            onClick={this.handleClick}
                            >Sign in instead</Button>
                            <Button size="medium" variant="contained" sx={{textTransform: 'none', fontWeight: 'bolder', fontSize: '0.875rem'}} onClick={this.next}>Next</Button>
                        </div>
                    </div>
                </div>
                <div className="image-container">
                    <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" height="244" width="244"/>
                    <div className="image-caption">
                        <span width="244">One account. All of FunDo<br></br> working for you.</span>
                    </div>
                </div>
            </div>
        )
    }
}
