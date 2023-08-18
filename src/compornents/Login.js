import React, { useReducer } from 'react';
import { withCookies } from 'react-cookie';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';  // この行を修正
import { START_FETCH, FETCH_SUCCESS, ERROR_CATCHED, INPUT_EDIT_LOG,INPUT_EDIT_REG, TOGGLE_MODE } from './actionTypes';

const StyledPaper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const StyledSpan = styled('span')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'teal',
  cursor: 'pointer',
});

const StyledSpanError = styled('span')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'fuchsia',
  marginTop: 10,
});

const initialState = {
    isLoading:false,
    isLoginView:true,
    error:'',
    credentialsLog:{
        username:'',
        password:''
    },
    credentialsReg:{
        email:'',
        password:''
    }
};

const loginReducer = (state,action) => {
    switch (action.type){
        case START_FETCH:{
            return{
                ...state,
            isLoading:true,       
            }
        }
        case FETCH_SUCCESS:{
            return{
                ...state,
            isLoading:false,       
            }
        }
        case ERROR_CATCHED:{
            return{
                ...state,
                error: 'Email or password is not correct!',
                isLoading:false
            }
        }
        case INPUT_EDIT_LOG:{
            return{
                ...state,
               credentialsLog:{
                ...state.credentialsLog,
                [action.inputName]:action.payload,
               },
               error:"",
            };
        }
        case INPUT_EDIT_REG:{
            return{
                ...state,
               credentialsReg:{
                ...state.credentialsReg,
                [action.inputName]:action.payload,
               },
               error:"",
            };
        }
        case TOGGLE_MODE:{
            return{
                ...state,
                isLoginView:!state.isLoginView,
            }
        }
        default:
            return state;
    }
}

const Login = (props) => {
  //const classes = useStyles();
  const [state,dispatch] = useReducer(loginReducer,initialState);

const inputChangedLog = () => (event) => {
    //const cred = state.credentialsLog;
    //cred[event.target.name] = event.target.value;
    dispatch({
        type:INPUT_EDIT_LOG,
        //inputName:'state.credentialLog',
        //payload:cred,
        inputName:event.target.name,
        payload:event.target.value,
    });
};

const inputChangedReg = () => (event) => {
    
    dispatch({
        type:INPUT_EDIT_REG,
        inputName:event.target.name,
        payload:event.target.value,
    })
}

const login = async(event) => {
    event.preventDefault()
    if(state.isLoginView){
        try{
            dispatch({type:START_FETCH})
            const res = await axios.post('http://127.0.0.1:8000/authen/',state.credentialsLog,{
                headers:{'Content-Type':'application/json'}
            })
            props.cookies.set('current-token',res.data.token)
            res.data.token ? (window.location.href = "/profiles") : (window.location.href = "/")
            dispatch({type:FETCH_SUCCESS})
        }catch{
            dispatch({type:ERROR_CATCHED})
        }
    }else{
        try{

            console.log("Sending registration data:", state.credentialsReg);

            dispatch({type:START_FETCH})
            await axios.post('http://127.0.0.1:8000/api/user/create/',state.credentialsReg,{
                headers:{'Content-Type':'application/json'}
            })            
            dispatch({type:FETCH_SUCCESS})
            dispatch({type:TOGGLE_MODE})
        }catch{
            dispatch({type:ERROR_CATCHED})
        }
    }
}

const toggleView = () => {
    dispatch({type: TOGGLE_MODE})
}

return (
    <Container maxWidth="xs">
      <StyledForm onSubmit={login}>
        <StyledPaper>
          {state.isLoading && <CircularProgress />}
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <Typography variant='h5'>
            {state.isLoginView ? "Login" : "Register"}
          </Typography>
  
          {state.isLoginView ? 
            <TextField 
              variant="outlined" 
              margin="normal" 
              fullWidth label="Email" 
              name="username"
              value={state.credentialsLog.username}
              onChange={inputChangedLog()}
              autoFocus/> :
            <TextField 
              variant="outlined" 
              margin="normal" 
              fullWidth label="Email" 
              name="email"
              value={state.credentialsReg.email}
              onChange={inputChangedReg()}
              autoFocus />
          }
          {state.isLoginView ? 
            <TextField 
              variant="outlined" 
              margin="normal" 
              fullWidth label="Password" 
              name="password"
              type="password"
              value={state.credentialsLog.password}
              onChange={inputChangedLog()}/> :
            <TextField 
              variant="outlined" 
              margin="normal" 
              fullWidth label="Password" 
              name="password"
              type="password"
              value={state.credentialsReg.password}
              onChange={inputChangedReg()}/>
          }
          <StyledSpanError>{state.error}</StyledSpanError>
  
          {state.isLoginView ? 
            (!state.credentialsLog.password || !state.credentialsLog.username) ?
              <StyledSubmitButton 
                type="submit" 
                fullWidth disabled variant="contained"
                color="primary">Login</StyledSubmitButton>
              :
              <StyledSubmitButton 
                type="submit" 
                fullWidth variant="contained"
                color="primary">Login</StyledSubmitButton>
            :
            (!state.credentialsReg.password || !state.credentialsReg.email) ?
              <StyledSubmitButton 
                type="submit" 
                fullWidth disabled variant="contained"
                color="primary">Register</StyledSubmitButton>
              :
              <StyledSubmitButton 
                type="submit" 
                fullWidth variant="contained"
                color="primary">Register</StyledSubmitButton>
          }
  
          <StyledSpan onClick={() => toggleView()}>
            {state.isLoginView ? 'Create Account ?' : 'Back to login?'}
          </StyledSpan>
        </StyledPaper>
      </StyledForm>
    </Container>
  );  
}

export default withCookies(Login);