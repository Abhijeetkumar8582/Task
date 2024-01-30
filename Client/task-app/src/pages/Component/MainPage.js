import React, { useState } from 'react'
import Style from '@/styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function MainPage() {
  useState(() => {

  }, [])
  const router = useRouter()
  const tasks = [
    {
      id: 1,
      taskName: 'React Project',
      description: 'Working on task application for resume',
      status: 'Work in progress',
      lastUpdated: '2023-03-12',
    },
    {
      id: 2,
      taskName: 'Node.js Backend',
      description: 'Setting up server and API endpoints',
      status: 'Testing',
      lastUpdated: '2023-03-15',
    },
    {
      id: 3,
      taskName: 'Design Mockups',
      description: 'Creating UI mockups for user feedback',
      status: 'Testing',
      lastUpdated: '2023-03-18',
    },
    {
      id: 4,
      taskName: 'Write Documentation',
      description: 'Documenting project features and usage',
      status: 'In Production',
      lastUpdated: '2023-03-20',
    },
    {
      id: 5,
      taskName: 'Testing Phase',
      description: 'Conducting comprehensive testing for bug detection',
      status: 'Work in progress',
      lastUpdated: '2023-03-25',
    },
  ];
  const getUserLogin = () => {
    if (sessionStorage.getItem('userLogin')) {
      router.push("/Component/Task")
    } else {
      router.push("/Component/Login")
    }
  }
  const getStatusBoxClass = (status) => {
    if (status === "Testing") {
      return Style.status_Testing
    } else if (status === "In Production") {
      return Style.status_Production
    } else {
      return Style.status_WIP
    }
  }
  return (
    <div className={Style.Main_Div}>
      <div className={Style.Main_Div_NavBar}>
        <div className={Style.NavBar_logo_Div}>
          <div className={Style.NavBar_logo_Div_innerOne_Image_div}><img src='https://repository-images.githubusercontent.com/438523287/ae558b41-79d7-49e1-a0b3-ff4e09faa400' style={{ width: '100%' }} /></div>
          <div className={Style.NavBar_logo_Div_innerOne_Image_div_content}><h4>Task App</h4></div>
        </div>
        <div className={Style.NavBar_logo_Div_innerTwo}>
          <h4>Get Started With your Task Application</h4>
        </div>
      </div>
      <div className={Style.Main_div_content_Section}>


        <div className={Style.content_Section_one}>

          <div className={Style.Section_one_Heading}>
            <h1 className={Style.Section_one_Heading_text}>Revolutionize your life effortlessly: a cutting-edge app for brilliant planning!</h1>
          </div>
          <div>
            <button onClick={()=>getUserLogin()} className={Style.getStartedBtn}> Get Started</button>
          </div>
          <div className={Style.Section_one_More_Section}>
            <h4 className={Style.Section_one_More_Section_text}>Maximize productivity with an intuitive interface. Seamlessly organize, prioritize, and conquer tasks effortlessly. Welcome to streamlined efficiency, where managing to-dos is a breeze.!</h4>
          </div>
        </div>
        <div className={Style.content_Section_two}>
          <div className={Style.TaskList_Main_div}>
            {tasks.map((element) => (
              <div className={Style.TaskListCard} key={element.taskName}>
                <div className={Style.TaskListCard_Status_div}>
                  <div className={getStatusBoxClass(element.status)}><h6>{element.status}</h6></div>
                </div>
                <div><h4>{element.taskName}</h4>
                </div>
                <div><p>{element.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default MainPage