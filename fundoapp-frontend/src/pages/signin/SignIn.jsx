import React, { Component } from 'react'
import './SignIn.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserService from '../../services/UserService';
import auth from '../../auth';
//import History from '../../history/History';
const userService = new UserService();

export default class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            emailError: false,
            passwordError: false,
        };
    }
    handleClick = () => {
        //History.push('/signup')
        this.props.history.push("/signup");
    }
    isValidated = () => {
        let isError = false;
        const errors = this.state;

        errors.emailError = this.state.email !== "" ? false : true;
        errors.passwordError = this.state.password !== "" ? false : true;

        this.setState({
            ...errors
        });
        return (isError = errors.emailError || errors.passwordError);
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
                "password":this.state.password,
            };
            userService.SignIn("/user/login",data)
            .then((res)=>{
                console.log(res);
                console.log("Login successful");
                localStorage.setItem('id',res.data.id);
                localStorage.setItem('email',res.data.email);
                localStorage.setItem('fullname',res.data.firstName+" "+res.data.lastName);
                //History.push('/dashboard')
                auth.login(()=>{
                    this.props.history.push("/dashboard");
                })
                
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    };
    render() {
        return (
            <div className="signin-container">
                <div className="container-content">
                <div className="logo-ele">
                        <span style={{color:'blue'}}>F</span>
                        <span style={{color:'red'}}>u</span>
                        <span style={{color:'orange'}}>n</span>
                        <span style={{color:'green'}}>D</span>
                        <span style={{color:'blue'}}>o</span>
                </div>
                <div className="page-heading">Sign in</div>
                <div className="container-description">Use your FunDo Account</div>
                <div className="email-field">
                    <TextField fullwidth id="emailid" name="email" label="Email or Phone" variant="outlined" margin="dense" 
                        error={this.state.emailError}
                        onChange={(e) => this.changeValue(e)}
                        helperText={this.state.emailError ? "Enter an email address" : ""}
                        size="medium" sx={{width: '100%'}} />
                </div>
                <div className="forgot-email">
                <Button className="email-button" size="small" sx={{textTransform: 'none', fontWeight: 'bolder', fontSize: '0.875rem'}}
                onClick={()=>{this.props.history.push("/forgot")}}>Forgot email?</Button>
                </div>
                <div className="signin-password-field">
                    <TextField fullwidth id="password" name="password" label="Password" variant="outlined" margin="dense" type="password" 
                            error={this.state.passwordError}
                            onChange={(e) => this.changeValue(e)}
                            helperText={this.state.passwordError ? "Enter a password" : ""}
                            size="medium" sx={{ width: '100%'}}/>
                </div>
                <div className="learn-more">
                    <div className="guest-mode">Not your computer? Use Guest mode to sign in privately.</div>
                    <Button size="small" sx={{textTransform: 'none', fontWeight: 'bolder', fontSize: '0.875rem'}}>Learn more</Button>
                </div>
                <div className="create-account-buttons">
                    <Button className="create-button" size="small" sx={{textTransform: 'none', fontWeight: 'bolder', fontSize: '0.875rem'}}
                    onClick={this.handleClick}>Create account</Button>
                    <Button size="medium" variant="contained" sx={{textTransform: 'none', fontWeight: 'bolder', fontSize: '0.875rem' ,float: 'right'}}onClick={this.next}>Next</Button>
                </div>
                </div>
            </div>
        )
    }
}
