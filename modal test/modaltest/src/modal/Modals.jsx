import React, { useState } from 'react';
import Modal1 from 'react-modal';
import Modal2 from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, FormGroup, Grid, Typography } from '@mui/material';

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
// const Popup = styled.style`
// content: {
//   top: '50%';
//   left: '50%';
//   right: 'auto';
//   bottom: 'auto';
//   margin-right: '-50%';
//   transform: 'translate(-50%, -50%)';
//   };
// overlay: {
//   backgroundColor: 'rgba(184, 55, 55, 0.7)',
//   };
// `

const Modals = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [logIned, setLogIneds] = useState({
    id: '',
    password: '',
    showPassword: false,
  });
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const handleChange =
    (pw) => (event) => {
      setLogIneds({ ...logIned, [pw]: event.target.value });
    };

  const loginedSubmit = () => {

  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#074f79';
  }

  const closeModal = () => {
    setOpen(false);
    setIsOpen(false);
  }

  const handleClickShowPassword = () => {
    setLogIneds({
      ...logIned,
      showPassword: !logIned.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        {/* 여기가 mui modal */}
        <Modal2
          open={open}
          // onClose={handleClose}
          //  이것은 모달 창을 만들때 외부를 클릭하면 꺼지도록 해주는 기능입니다.
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <FormGroup>
              <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" style={{ alignItems: 'center' }}>
                <InputLabel htmlFor="outlined-adornment-id">ID</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="outlined-adornment-id"
                  type='text'
                  value={logIned.id}
                  onChange={handleChange('id')}
                  label="ID"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" style={{ alignItems: 'center' }}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="outlined-adornment-password"
                  type={logIned.showPassword ? 'text' : 'password'}
                  value={logIned.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {logIned.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Grid container spacing={3}>
                <Grid item xs style={{ paddingLeft: '40px' }}>
                  <Button variant="contained" style={{ marginTop: '10px', }} onClick={closeModal}>취소</Button>
                </Grid>
                <Grid item xs='2' />
                <Grid item xs>
                  <Button variant="contained" onClick={loginedSubmit} style={{ marginTop: '10px' }}>로그인</Button>
                </Grid>
              </Grid>
            </FormGroup>
          </Box>
        </Modal2>
      </div>

      {/* 여기가 react modal */}
      <Modal1
        style={customStyles}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        //  이것은 모달 창을 만들때 외부를 클릭하면 꺼지도록 해주는 기능입니다.
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{ textAlign: 'center' }}>로그인</h2> */}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} /> */}
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <FormGroup style={{ marginTop: '10px' }}>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" style={{ alignItems: 'center' }}>
              <InputLabel htmlFor="outlined-adornment-id">ID</InputLabel>
              <OutlinedInput
                fullWidth
                id="outlined-adornment-id"
                type='text'
                value={logIned.id}
                onChange={handleChange('id')}
                label="ID"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" style={{ alignItems: 'center' }}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                fullWidth
                id="outlined-adornment-password"
                type={logIned.showPassword ? 'text' : 'password'}
                value={logIned.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {logIned.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Grid container spacing={3}>
              <Grid item xs style={{ paddingLeft: '40px' }}>
                <Button variant="contained" style={{ marginTop: '10px', }} onClick={closeModal}>취소</Button>
              </Grid>
              <Grid item xs='2' />
              <Grid item xs>
                <Button variant="contained" onClick={loginedSubmit} style={{ marginTop: '10px' }}>로그인</Button>
              </Grid>
            </Grid>
          </FormGroup>
        </Box>
      </Modal1>
    </div >
  );
};

export default Modals;