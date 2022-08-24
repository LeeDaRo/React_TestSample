import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, FormGroup, Grid, Typography } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  paddingBottom: '50px'
};

// 규격표기 폰트
const inputOutfont = {
  color: 'green',
  paddingLeft: '10px',
  fontSize: '15px'
}
const inputOutdiv = {
  display: 'flex',
  height: '35px'
}

// 경고 규격 폰트
const inputOutfontDanger = {
  paddingLeft: '10px',
  color: ' red'
}

const Register = () => {

  // 입력받을 데이터
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    passwordChecker: '',
    f_name: '',
    l_name: '',
    email: '',
    code: '',
    nickname: '',
    showPassword: false,
  });

  // 패스워드 유효성 확인 
  const [passwordCheck, setPasswordCheck] = useState(true);
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,255}$/
  // 패스워드 확인
  const [passwordChecked, setPasswordChecked] = useState(true);
  // 아이디 유효성 확인
  const [username, setUsername] = useState(true);
  const usernameRegex = /^[A-Za-z0-9+]{5,}$/;
  // 이메일 유효성 확인
  const [emailCheck, setEmailCheck] = useState(true);
  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  // 이메일 인증코드 확인
  const [certified, setCertified] = useState(false);
  // 이름 입력 확인
  const [nameCheck, setNameCheck] = useState(true);
  //닉네임 입력 확인
  const [nickname, setNickname] = useState(true);

  // 아이디 중복검사 
  const usernameCheck = () => {

    axios.post("/api/user/check/username", userInfo.username).then().catch();
  }

  // 닉네임 중복검사
  const nicknameCheck = () => {
    axios.post("/api/user/check/nickname", userInfo.nickname).then().catch();
  }

  // 회원가입 전송
  const createUserHandler = () => {
    if (passwordCheck && passwordChecked && username && emailCheck && certified && nameCheck && nickname) {
      axios.post("/api/user/signup", userInfo).then().catch()
    }
  }

  useEffect(() => {

    // 아이디 유효성 검사
    if (userInfo.username == '') {
      setUsername(true);
    } else if (userInfo.username.length < 5) {
      setUsername(false);
    } else if (!usernameRegex.test(userInfo.username)) {
      setUsername(false);
    } else {
      setUsername(true);
    }

    // 패스워드 유효성 검사
    if (passwordRegex.test(userInfo.password)) {
      setPasswordCheck(true);
    } else if (userInfo.password == '') {
      setPasswordCheck(true);
    } else {
      setPasswordCheck(false);
    }

    // 패스워드 입력값이 같은지 확인 후 다르면 경고 메시지 출력
    if (userInfo.password == userInfo.passwordChecker) {
      setPasswordChecked(true);
    } else if (userInfo.passwordChecker == '') {
      setPasswordChecked(true);
    } else {
      setPasswordChecked(false);
    }

    // 이름 유효성 검사
    if (userInfo.f_name == '') {
      setNameCheck(false);
    } else if (userInfo.l_name == '') {
      setNameCheck(false);
    } else {
      setNameCheck(true);
    }

    // 닉네임 유효성 검사
    if (userInfo.nickname != '') {
      setNickname(true);
    } else {
      setNickname(false);
    }

    // 이메일 형식 유효성 검사
    if (emailRegex.test(userInfo.email)) {
      setEmailCheck(true);
    } else if (userInfo.email == '') {
      setEmailCheck(true);
    } else {
      setEmailCheck(false);
    }

  }, [userInfo]);

  // 입력값 받기
  const handleChange =
    (info) => (e) => {
      setUserInfo({ ...userInfo, [info]: e.target.value });
    };

  // 패스워드의 입력 값을 확인하는 핸들러
  const handleClickShowPassword = () => {
    setUserInfo({
      ...userInfo,
      showPassword: !userInfo.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  // 이메일 인증 핸들러
  const emailCheckHandler = (e) => {
    e.preventDefault();
    if (emailRegex.test(userInfo.email)) {
      setEmailCheck(true);
      setCertified(true);
    } else if (userInfo.email == '') {
      setEmailCheck(false);
      setCertified(false);
    } else {
      setEmailCheck(false);
      setCertified(false);
    }
  }

  // 회원가입 취소하고 이전페이지로
  const noCreateUserHandler = () => {

  }



  return (
    <div style={{ margin: 50 }}>
      <Box sx={style}>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        {/**아이디 입력 */}
        <FormGroup>
          <div style={inputOutdiv}>
            <p style={inputOutfont}>5자이상 입력해주세요</p>
          </div>
          <Grid container>
            <Grid item sx={{ display: 'flex', height: 'auto' }}>
              <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" style={{ alignItems: 'center' }}>
                <InputLabel htmlFor="outlined-adornment-id">ID</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="username"
                  name='username'
                  type='text'
                  value={userInfo.username}
                  onChange={handleChange('username')}
                  label="ID"
                />
              </FormControl>
              <Button sx={{ width: '10ch', height: '7ch', m: 1 }} variant="contained" onClick={usernameCheck} style={{ padding: 8 }} >중복확인</Button>
            </Grid>
          </Grid>
          {/**아이디 확인 경고창*/}
          <div style={{ display: 'flex', height: '30px', marginTop: '-25px', marginBottom: '20px' }}>
            {username ? <p>&nbsp;</p> : <p style={inputOutfontDanger}>형식에 맞게 입력해주세요.</p>}
          </div>

          {/**비밀번호 입력 */}
          <div style={inputOutdiv}>
            <p style={inputOutfont}>숫자 + 영문자 + 특수문자를 포함하여 8자리이상 입력해주세요.</p>
          </div>
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
          {/**비밀번호 경고창*/}
          <div style={{ display: 'flex', marginTop: '-25px' }}>
            {passwordCheck ? <p>&nbsp;</p> : <p style={inputOutfontDanger}>형식에 맞게 입력해주세요.</p>}
          </div>

          {/**비밀번호 확인 입력 */}
          <div style={inputOutdiv}>
            <p style={inputOutfont}>비밀번호를 다시한번 입력해주세요.</p>
          </div>
          <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" style={{ alignItems: 'center' }}>
            <InputLabel htmlFor="outlined-adornment-password">PasswordChecker</InputLabel>
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
          {/**비밀번호 확인 경고창*/}
          <div style={{ display: 'flex', marginTop: '-25px' }}>
            {passwordChecked ? <p>&nbsp;</p> : <p style={inputOutfontDanger}>비밀번호를 확인해 주세요</p>}
          </div>

          {/**성 이름 입력 */}
          <div style={inputOutdiv}>
            <p style={inputOutfont}>이름을 입력해주세요.</p>
          </div>
          <Grid container>
            <Grid item sx={{ display: 'flex', height: 'auto' }}>
              <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined" style={{ alignItems: 'center' }}>
                <InputLabel htmlFor="outlined-adornment-id">성</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="l_name"
                  name='l_name'
                  type='text'
                  value={userInfo.l_name}
                  onChange={handleChange('l_name')}
                  label="l_name"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined" style={{ alignItems: 'center' }}>
                <InputLabel htmlFor="outlined-adornment-id">이름</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="f_name"
                  name='f_name'
                  type='text'
                  value={userInfo.f_name}
                  onChange={handleChange('f_name')}
                  label="f_name"
                />
              </FormControl>
            </Grid>
          </Grid>
          {/**이름 확인 경고창*/}
          <div style={{ display: 'flex', height: '30px', marginTop: '-25px', marginBottom: '20px' }}>
            {nameCheck ? <p>&nbsp;</p> : <p style={inputOutfontDanger}>이름을 입력해주세요.</p>}
          </div>

          {/**닉네임 입력 */}
          <div style={inputOutdiv}>
            <p style={inputOutfont}>사용하실 닉네임을 입력해주세요.</p>
          </div>
          <Grid container>
            <Grid item sx={{ display: 'flex', height: 'auto' }}>
              <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" style={{ alignItems: 'center' }}>
                <InputLabel htmlFor="outlined-adornment-nickname">NickName</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="nickname"
                  name='nickname'
                  type='text'
                  value={userInfo.nickname}
                  onChange={handleChange('nickname')}
                  label="nickname"
                />
              </FormControl>
              <Button sx={{ width: '10ch', height: '7ch', m: 1 }} variant="contained" onClick={nicknameCheck} style={{ padding: 8 }} >중복확인</Button>
            </Grid>
          </Grid>
          {/**아이디 확인 경고창*/}
          <div style={{ display: 'flex', height: '30px', marginTop: '-25px', marginBottom: '20px' }}>
            {username ? <p>&nbsp;</p> : <p style={inputOutfontDanger}>형식에 맞게 입력해주세요.</p>}
          </div>

          {/**이메일 입력 */}
          <div style={inputOutdiv}>
            <p style={inputOutfont}>본인 확인을 위해 이메일을 입력 후 인증해주세요.</p>
          </div>
          <Grid sx={{ display: 'flex', height: 'auto' }}>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" style={{ alignItems: 'center' }}>
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                fullWidth
                id="email"
                name='email'
                type='text'
                value={userInfo.email}
                onChange={handleChange('email')}
                label="email"
              />
            </FormControl>
            <Button sx={{ width: '10ch', height: '7ch', m: 1 }} variant="contained" onClick={emailCheckHandler} style={{ padding: 8 }} >코드받기</Button>
          </Grid>
          {/*이메일 확인 경고창*/}
          <div style={{ display: 'flex', marginTop: '-25px' }}>
            {emailCheck ? <p>&nbsp;</p> : <p style={inputOutfontDanger}>이메일의 형식에 맞지않습니다.</p>}
          </div>

          {certified ? <div>
            <div style={inputOutdiv}>
              <p style={inputOutfont}>본인 확인을 위해 전송받은 코드를 인증해주세요.</p>
            </div>
            <Grid sx={{ display: 'flex', height: 'auto' }}>
              <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined" style={{ alignItems: 'center' }}>
                <InputLabel htmlFor="outlined-adornment-code">Code</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="code"
                  name='code'
                  type='text'
                  value={userInfo.code}
                  onChange={handleChange('code')}
                  label="code"
                />
              </FormControl>
              {/*이메일 인증 코드 확인 경고창*/}

              <Button sx={{ width: '10ch', height: '7ch', m: 1 }} variant="contained" onClick={emailCheckHandler} style={{ padding: 8 }} >다시받기</Button>
              <Button sx={{ width: '10ch', height: '7ch', m: 1 }} variant="contained" onClick={emailCheckHandler} style={{ padding: 8 }} >인증확인</Button>
            </Grid>
            <div style={{ display: 'flex', marginTop: '-25px' }}>
              {emailCheck ? <p style={inputOutfontDanger}>코드가 오지 않았다면 다시받기를 눌러주세요.</p> : <p style={inputOutfontDanger}>잘못 입력하셨습니다.</p>}
            </div></div> : <p></p>}
          {/**이메일 코드 인증코드 입력창 */}

          <Grid container spacing={3}>
            <Grid item xs style={{ paddingLeft: '40px' }}>
              <Button variant="contained" style={{ marginTop: '10px' }} onClick={noCreateUserHandler}>취소하기</Button>
            </Grid>
            <Grid item xs='2' />
            <Grid item xs>
              <Button variant="contained" onClick={createUserHandler} style={{ marginTop: '10px' }}>회원가입</Button>
            </Grid>
          </Grid>
        </FormGroup>
      </Box>
    </div >
  );
};

export default Register;