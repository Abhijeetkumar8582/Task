import Image from 'next/image'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Style from '@/styles/SignUp.module.css';
import Link from 'next/link';
import { useRouter } from "next/router";


function SignUP() {
    const router = useRouter();
    const [userName, setuserName] = useState('')
    const [userEmail, setuserEmail] = useState('')
    const [Error_userEmail,set_Error_userEmail]=useState('')
    const [userPassword, setuserPassword] = useState('')
    const SignUP_function = () => {
        fetch('https://task-tdbd.onrender.com/createUserProfile', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "name": userName,
                "email": userEmail
                // "password": userPassword
            })
        })
            .then((res) => res.json())
            .then((data) => { 
                if(!data.error){
                    router.push("/Component/Task")
                }
            })
            .catch((error) => console.log(error))
    };

    const userName_Change = (e) => {
        setuserName(e.target.value)
    }
    const userEmail_Change = (e) => {
        setuserEmail(e.target.value)
    }
    const userPasswor_Change = (e) => {
        setuserPassword(e.target.value)
    }
    return (

        <div className={Style.SignUp_Page_Div}>

            <div style={{ width: '50%' }}>
                <Image
                    src="https://img.freepik.com/free-vector/freelancer-working-laptop-her-house_1150-35048.jpg?w=1060&t=st=1705524685~exp=1705525285~hmac=6fa94a3e9a11f659b37cf836d508a8dd59cbfb49af613ed477e9b52144aaa069"
                    alt="Your Image Alt Text"
                    width={900}
                    height={700}
                    style={{ width: '100%', mixBlendMode: 'color-burn' }}
                />
            </div>
            <div className={Style.SignUp_left_div}>
                <div style={{ marginBottom: '70px' }}>
                    <img src='/favicon.ico' style={{ width: '25px' }} />
                </div>
                <div style={{ marginBottom: '70px' }}>
                    <h1>Hey, hello 👋</h1>
                </div>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                    <h4>Please enter your details below for registration</h4>
                </div>
                <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: 500, maxWidth: '100%', color: 'white', backgroundColor: 'white', borderRadius: '10px' }}>
                        <TextField fullWidth label="Name" id="fullWidth" onChange={(e) => userName_Change(e)} />
                    </Box>

                </div>
                <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: 500, maxWidth: '100%', color: 'white', backgroundColor: 'white', borderRadius: '10px' }}>
                        <TextField fullWidth label="Email ID" id="fullWidth" onChange={(e) => userEmail_Change(e)} />
                    </Box>

                </div>
                <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: 500, maxWidth: '100%', color: 'white', backgroundColor: 'white', borderRadius: '10px' }}>
                        <TextField fullWidth label="Password" disabled id="fullWidth" onChange={(e) => userPasswor_Change(e)} />
                    </Box>

                </div>

                <div className={Style.sign_up_button_div}>
                    <button className={Style.sign_up_button} onClick={() => SignUP_function()}> Sign up</button>
                </div>
                <div style={{ border: '2px solid', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}></div>
                <div style={{ display: 'flex', justifyContent: "center" }}>
                    <h5>Already have an account <Link href='/Component/Login'><b>Sign in</b></Link></h5>
                </div>
            </div>
        </div>
        // </>
    )
}

export default SignUP