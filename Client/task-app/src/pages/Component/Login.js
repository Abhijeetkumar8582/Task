import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Style from '@/styles/Login.module.css';
import Link from 'next/link';
import { useRouter } from "next/router";
import {accessToken,userName } from '../Redux/Action/index.js'
import { useDispatch, useSelector } from "react-redux";


function Login() {
    const router = useRouter();
    const dispatch=useDispatch()
    const [email, setEmail] = useState('')
    const [EmailError, setEmailError] = useState(false)
    const [EmailErrorMessage, setEmailErrorMessage] = useState('Email ID')
    const [password, setpassword] = useState('')
    const [passwordError, setpasswordError] = useState(false)
    const [passwordErrorMessage, sepasswordErrorMessage] = useState('Password')
    const enterEmailID = (e) => {
        setEmail(e.target.value)
        setEmailError(false)
    }
    const enterPassword = (e) => {
        setpassword(e.target.value)
        setpasswordError(false)
    }
    const Logins = () => {
        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "email": email,
                    "password": password
                }
            )
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.accessToken) {
                    console.log(data.accessToken)
                    dispatch(accessToken(data.accessToken))
                    dispatch(userName(data.name))
                    router.push("/Component/Task")
                } else if (data.error == "Invalid Email ID details") {
                    setEmailError(true)
                    setEmailErrorMessage("You have enter wrong email ID")
                } else if (data.error == "Invalid User details") {
                    setpasswordError(true)
                    sepasswordErrorMessage("You have enter wrong Password")
                }
            })
            .catch((error) => console.error('Error:', error));
    };


    return (

        <div className={Style.loginMainPage}>
            <div className={Style.loginpage_left_div}>
                <div style={{ marginBottom: '70px' }}>
                    <img src='/favicon.ico' style={{ width: '25px' }} />
                </div>
                <div style={{ marginBottom: '70px' }}>
                    <h1>Welcome back!</h1>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <h4>Please enter your login details here</h4>
                </div>
                <div style={{ marginBottom: '30px' }}>
                    <Box sx={{ width: 500, maxWidth: '100%' }}>
                        <TextField fullWidth onChange={(e) => enterEmailID(e)} error={EmailError} label={EmailErrorMessage} id="fullWidth" />
                    </Box>
                </div>
                <div style={{ marginBottom: '30px' }}>
                    <Box sx={{ width: 500, maxWidth: '100%' }}>
                        <TextField fullWidth onChange={(e) => enterPassword(e)} error={passwordError} label={passwordErrorMessage} type="password" id="fullWidth" />
                    </Box>

                </div>
                <div className={Style.forget_password}>
                    <h5>Forget password?</h5>
                </div>
                <div className={Style.sign_in_button_div}>
                    <button className={Style.sign_in_button} onClick={() => Logins()}> Sign in</button>
                </div>
                <div style={{ border: '2px solid', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}></div>
                <div style={{ display: 'flex', justifyContent: "center" }}>
                    <h5>Don't have an account <Link href='/Component/SignUp'><b>Sign Up</b></Link></h5>
                </div>
            </div>
            <div style={{ width: '50%' }}>
                <Image
                    src="https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5598.jpg?w=1060&t=st=1705526420~exp=1705527020~hmac=d4f23c5ebdfefab7e5287bf5b140e596909d640990922016080196c503a64e4e"
                    alt="Your Image Alt Text"
                    width={900}
                    height={700}
                    style={{ width: '100%', mixBlendMode: 'color-burn' }}
                />
            </div>
        </div>
        // </>
    )
}

export default Login