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
      status: 'Pending',
      lastUpdated: '2023-03-15',
    },
    {
      id: 3,
      taskName: 'Design Mockups',
      description: 'Creating UI mockups for user feedback',
      status: 'In design phase',
      lastUpdated: '2023-03-18',
    },
    {
      id: 4,
      taskName: 'Write Documentation',
      description: 'Documenting project features and usage',
      status: 'To be started',
      lastUpdated: '2023-03-20',
    },
    {
      id: 5,
      taskName: 'Testing Phase',
      description: 'Conducting comprehensive testing for bug detection',
      status: 'Upcoming',
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
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
        <div>
          <h4>Task App</h4>
        </div>
        <div>
          <button className={Style.getStartedBtn} onClick={() => getUserLogin()} ><h5>Get Started's</h5></button>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <h1>Welcome to task Application</h1>

        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
          <h4>Streamline productivity with an intuitive interface. Organize, prioritize, and conquer your to-dos effortlessly. Welcome to efficiency!</h4>
        </div>

        <div >

          <table >
            <tbody>
              <tr>
                <td>ID</td>
                <td>Task Name</td>
                <td>Description</td>
                <td>Status</td>
                <td>lastUpdated</td>
              </tr>
              {tasks.map((element, i) => (
                <tr key={i}>
                  <td>{element.id}</td>
                  <td>{element.taskName}</td>
                  <td>{element.description}</td>
                  <td>{element.status}</td>
                  <td>{element.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MainPage