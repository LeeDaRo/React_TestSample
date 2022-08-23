import React, { useState } from 'react';
import Modal1 from 'react-modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Container, FormGroup, Grid, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24
  },
  overlay: {
    backgroundColor: 'rgba(49, 92, 38, 0.7)',
  }
};

const Register = () => {

  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
    passwordChecker: '',
    showPassword: false,
  });

  const [passwordChecked, setPasswordChecked] = useState(false);

  const usernameCheck = () => {
    //엑시오스 통신해서 중복검사 하자 
  }
  const handleChange =
    (info) => (e) => {
      setUserInfo({ ...userInfo, [info]: e.target.value });
      if (userInfo.password == userInfo.passwordChecker) {
        setPasswordChecked(!passwordChecked);
      }
    };

  const handleClickShowPassword = () => {
    setUserInfo({
      ...userInfo,
      showPassword: !userInfo.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <FormGroup>
            <Grid sx={{ display: 'flex', height: 'auto' }}>
              <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" style={{ alignItems: 'center' }}>
                <InputLabel htmlFor="outlined-adornment-id">ID</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="username"
                  name='username'
                  type='text'
                  value={userInfo.id}
                  onChange={handleChange('id')}
                  label="ID"
                />
              </FormControl>
              <Button sx={{ width: '10ch', height: '7ch', m: 1 }} variant="contained" onClick={usernameCheck} style={{ padding: 8 }} >중복확인</Button>
            </Grid>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" style={{ alignItems: 'center' }}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                fullWidth
                id="outlined-adornment-password"
                type={userInfo.showPassword ? 'text' : 'password'}
                value={userInfo.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {userInfo.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" style={{ alignItems: 'center' }}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                fullWidth
                id="outlined-adornment-password"
                type={userInfo.showPassword ? 'text' : 'password'}
                value={userInfo.passwordChecker}
                onChange={handleChange('passwordChecker')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle passwordChecker visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {userInfo.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="PasswordChecker"
              />
            </FormControl>
            <Grid container spacing={3}>
              <Grid item xs style={{ paddingLeft: '40px' }}>
                <Button variant="contained" style={{ marginTop: '10px', }} onClick={1}>취소</Button>
              </Grid>
              <Grid item xs='2' />
              <Grid item xs>
                <Button variant="contained" onClick={1} style={{ marginTop: '10px' }}>회원가입</Button>
              </Grid>
            </Grid>
          </FormGroup>
        </Box>
      </div>
    </div>
  );
};

export default Register;