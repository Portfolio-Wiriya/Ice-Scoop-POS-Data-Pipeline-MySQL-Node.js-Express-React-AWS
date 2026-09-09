import React, { createContext, useContext, useEffect, useState } from 'react';
// import { products } from '../adapters/Data';

const StockContext = createContext();
const API_URL = 'http://localhost:4000';

export function StockProvider({children}) {
    const [stock, setStock] = useState([]);

    const [notice, setNotice] = useState('');

    // ดึงสินค้าทั้งหมดจาก Express (แทนที่ products.map(...) จาก Data.js เดิม)
    const fetchStock = async () => {
        try {
            const res = await fetch(`${API_URL}/products`);
            const data = await res.json();
            setStock(data);
        } catch (err) {
            console.error(err);
            setNotice('เชื่อมต่อ server ไม่ได้');
        }
    };

    // โหลดข้อมูลครั้งแรกตอนแอปเปิด
    useEffect(() => {
        fetchStock();
    }, []);

    // มาร์คสินค้าหมด — ยิงไปที่ Express แทนแก้ state ตรงๆ
    const handleOut = async (item) => {
        try {
            await fetch(`${API_URL}/products/${item.id}/stock`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ in_stock: false }),
            });
            await fetchStock(); // ดึงข้อมูลใหม่ให้ตรงกับ database
            setNotice(`${item.name} สินค้าหมดแล้ว`);
        } catch (err) {
            console.error(err);
            setNotice('เกิดข้อผิดพลาด ไม่สามารถอัปเดตสถานะได้');
        }
    };

    // เติมสินค้า
    const handleMarkAvailable = async (item) => {
        try {
            await fetch(`${API_URL}/products/${item.id}/stock`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ in_stock: true }),
            });
            await fetchStock();
            setNotice(`${item.name} เติมของเรียบร้อย`);
        } catch (err) {
            console.error(err);
            setNotice('เกิดข้อผิดพลาด ไม่สามารถอัปเดตสถานะได้');
        }
    };


    // ฟังก์ชันเช็คสินค้าว่าสินค้าชิ้นนี้หมดหรือไม่
    const isOutOfStock = (id) => {
        const item = stock.find((s) => s.id === id);
        return item ? !item.in_stock : false;
    };

    return (
        <StockContext.Provider value={ {stock, notice, handleOut, handleMarkAvailable, isOutOfStock}}>
            {children}
        </StockContext.Provider>
    );
}

export function useStock() {
    return useContext(StockContext);
}