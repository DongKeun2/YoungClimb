import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import './login.css'
import api from '../../util/api'
import { SET_TOKEN } from '../../reducer/slice/TokenSlice'
import { setRefreshToken } from '../../reducer/slice/Cookie'

import phone from '../../assets/img/GalaxyS21.png'

const AdminLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({ email: '', password: '' })

  const onChange = event => {
    const { name, value } = event.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  // 로그인 시에
  //  1. 리프레시토큰 저장
  //  2. access토큰 저장
  const login = () => {
    if (!user.email || !user.password) {
      alert('로그인 정보를 모두 입력해주세요')
    } else {
      axios
        .post(api.login(), user)
        .then(res => {
          setRefreshToken(res.data.refreshToken)
          dispatch(SET_TOKEN(res.data.accessToken))
          navigate('/admin/report', { replace: true })
        })
        .catch(err => {
          alert(err.response.data)
        })
    }
  }

  const handleEnter = e => {
    if (e.key === 'Enter') {
      login()
    }
  }

  return (
    <div className="height100">
      <img src={phone} className="phone" />
      <div className="loginDiv">
        <div className="loginText">
          <div>ADMIN LOGIN</div>
        </div>
        <div className="inputDiv">
          <div className="inputContentDiv">
            <div className="subtext">
              <div>ID</div>
            </div>
            <input
              name="email"
              className="loginInput"
              type="text"
              value={user.id}
              onKeyUp={handleEnter}
              onChange={onChange}
            />
          </div>
          <div className="inputContentDiv">
            <div className="subtext">
              <div>PW</div>
            </div>
            <input
              name="password"
              className="loginInput"
              type="password"
              value={user.pw}
              onKeyUp={handleEnter}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="loginBtn" onClick={login}>
          <div>로그인</div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
