import React, { useState, useEffect } from 'react';
import './POSView.css'
import Header from '../complement/Header';
import TaskBar from '../complement/TaskBar';
// import { products} from '../adapters/Data';
import { useStock } from '../context/StockContext';

function InventoryView() {

    // ตัวแปร function จาก Stockcontext.js
    const {stock, notice, handleOut, handleMarkAvailable} = useStock();


    const flavors = stock.filter(p => p.category === 'flavor');
    const containers = stock.filter(p => p.category === 'container');
    const toppings = stock.filter(p => p.category === 'topping');


    // แสดงคลังสินค้า
    const renderSection = (title, items) => (
    <section className='pd-panel'>
        <h2 className='pd-name'>{title}</h2>
        <div className='pd-grid'>
        {items.map((item) => {
            {/* const isOut = stock.includes(item.id); */}
            {/* เช็คสถานะปัจจุบันของสินค้าในคลัง*/}
            {/* const stockItem = stock.find((s) => s.id === item.id); */}
            const isOut = !item.in_stock;


            return (
            <div className={`pd-card ${isOut ? 'pd-card-out' : ''}`} key={item.id}>
                {isOut && <span className='pd-badge-out'>สินค้าหมด</span>}
                <p className='pd-emoji'>{item.emoji}</p>
                <h3 className='pd-name'>{item.name}</h3>
                <p className='pd-price'>฿ {item.price}</p>

                {isOut ? (
                <button className='pd-btn pd-btn-available' onClick={() => handleMarkAvailable(item)}>
                    เติมของแล้ว
                </button>
                ) : (
                <button className='pd-btn pd-btn-out' onClick={() => handleOut(item)}>
                    หมด
                </button>
                )}
            </div>
            );
        })}
        </div>
    </section>
    );

    return (
    <div className='con-pos'>
        <Header/>
        <div className='pos-body'>
            <TaskBar/>
    
            <div className='pd-scroll'>
                {notice && <div className='stock-notice'>{notice}</div>}

                {renderSection('ภาชนะ', containers)}
                {renderSection('รสชาติ', flavors)}
                {renderSection('ท็อปปิ้ง', toppings)}
            </div>
        </div>
    </div>
    );
};

export default InventoryView;
