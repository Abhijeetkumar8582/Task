import React, { useState } from 'react';
import Style from '@/styles/Task.module.css';

function TaskDescHOC({i, element, taskRowSelected,getStatusBoxClass,Checkbox_ID_Selected }) {
    const [count, setCount] = useState(55);

    const handleClick = () => {
        if (count === element.taskDesc.length) {
            console.log("deselected");
            setCount(55);
        } else {
            console.log("selected", element.taskDesc);
            setCount(element.taskDesc.length);
        }
        taskRowSelected(element.taskDesc, /* pass the index or any other required argument */);
    };

    return (
    //    <div>
        <div className={Style.task_row_div} key={element.taskName} onClick={()=>handleClick(element.taskDesc,i)}>
                        <div className={Style.task_row_Inner_Item}>
                            <div style={{ display: 'flex' }}><input type="checkbox" style={{ margin: '0px 5px 0px 0px' }} onChange={() => Checkbox_ID_Selected(`${element.taskName}`)} /><h4>{i + 1}</h4></div>
                            <div className={getStatusBoxClass(element.status)}><h4>{element.status}</h4></div>
                        </div>
                        <div className={Style.task_row_Inner_Item}>
                            <h4>{element.taskName}</h4>
                        </div>
                        <div className={Style.task_row_Inner_Item}>
                            <h4>{element.taskDesc.slice(0,count)}...</h4>
                        </div>
                        {/* <TaskDescription  element={element} taskRowSelected={taskRow_selected}/> */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <h4>{element.lastUpdated}</h4>
                        </div>
                    </div>
    //    </div>
    );
}

export default TaskDescHOC;
