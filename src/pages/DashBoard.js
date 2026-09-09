import React from 'react';
import './POSView.css'
import Header from '../complement/Header';
import TaskBar from '../complement/TaskBar';
import { products} from '../adapters/Data';

function DashBoard() {

    return (
    <div className='con-pos'>
        <Header/>
        <div className='pos-body'>
            <TaskBar/>
    
            <div className='pd-scroll'>
                {/* กราฟ */}
            </div>
        </div>
    </div>
    );
};

export default DashBoard;
