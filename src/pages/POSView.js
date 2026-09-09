import React, { useState, useEffect } from 'react';
import './POSView.css'
import Header from '../complement/Header';
import TaskBar from '../complement/TaskBar';
import { useStock } from '../context/StockContext';

const API_URL = 'http://localhost:4000'; // ★ เพิ่มบรรทัดนี้

function POSView() {
  const [order, setOrder] = useState([]);
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const { stock, isOutOfStock } = useStock();

  const flavors = stock.filter(p => p.category === 'flavor');
  const containers = stock.filter(p => p.category === 'container');
  const toppings = stock.filter(p => p.category === 'topping');

  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const res = await fetch(`${API_URL}/orders`);
      const data = await res.json();
      setOrderHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAdd = (item) => {
    if (isOutOfStock(item.id)) return;
    setOrder((prev) => {
      const existingOrder = prev.find((o) => o.id === item.id);
      if (existingOrder) {
        return prev.map((o) =>
          o.id === item.id ? { ...o, qty: o.qty + 1 } : o
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleDecrease = (id) => {
    setOrder((prev) =>
      prev.map((o) => (o.id === id ? { ...o, qty: o.qty - 1 } : o)).filter((o) => o.qty > 0)
    );
  };

  const handleRemove = (id) => {
    setOrder((prev) => prev.filter((o) => o.id !== id));
  };

  const total = order.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (order.length === 0) return;
    setCheckingOut(true);

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total,
          items: order.map((item) => ({
            id: item.id,
            price: item.price,
            qty: item.qty,
          })),
        }),
      });
      if (!res.ok) throw new Error('บันทึกรายการชำระเงินไม่สำเร็จ');

      const data = await res.json();
      alert(`ชำระเงินสำเร็จ! เลขรายการสินค้า #${data.orderId}`);
      setOrder([]);
      await fetchHistory();
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาด ไม่สามารถบันทึกรายการสินค้าได้');
    } finally {
      setCheckingOut(false);
    }
  };

  const viewDetail = async (orderId) => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}`);
      const data = await res.json();
      setSelectedOrder(data);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString('th-TH', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const renderSection = (title, items) => (
    <section className='pd-panel'>
      <h2 className='pd-name'>{title}</h2>
      <div className='pd-grid'>
        {items.map((item) => {
          const isOut = isOutOfStock(item.id);
          return (
            <div className={`pd-card ${isOut ? 'pd-card-out' : ''}`} key={item.id}>
              {isOut && <span className='pd-badge-out'>สินค้าหมด</span>}
              <p className='pd-emoji'>{item.emoji}</p>
              <h3 className='pd-name'>{item.name}</h3>
              <p className='pd-price'>฿ {item.price}</p>
              <button
                className='pd-btn'
                onClick={() => handleAdd(item)}
                disabled={isOut}
              >
                {isOut ? 'สินค้าหมด' : 'เพิ่ม'}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <div className='con-pos'>
      <Header />
      <div className='pos-body'>
        <TaskBar />

        <div className='pd-scroll'>
          {renderSection('ภาชนะ', containers)}
          {renderSection('รสชาติ', flavors)}
          {renderSection('ท็อปปิ้ง', toppings)}

          {/* ประวัติรายกรสินค้า */}
          <section className='pd-panel'>
            <h2 className='pd-name'>ประวัติรายการการชำระเงิน</h2>

            {loadingHistory ? (
              <p>กำลังโหลด...</p>
            ) : orderHistory.length === 0 ? (
              <p className='bill-empty'>ยังไม่มีประวัติการขาย</p>
            ) : (
              <div className='history-list'>
                {orderHistory.map((o) => (
                  <div className='history-item' key={o.id} onClick={() => viewDetail(o.id)}>
                    <div>
                      <p className='history-id'>รายการที่ #{o.id}</p>
                      <p className='history-date'>{formatDate(o.created_at)}</p>
                    </div>
                    <div className='history-right'>
                      <span className='history-total'>฿ {Number(o.total).toFixed(2)}</span>
                      <span className={`history-status status-${o.status}`}>
                        {o.status === 'paid' ? 'ชำระแล้ว' : 'ยกเลิก'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className='bill-panel'>
          {selectedOrder ? (
            <>
              <h2 className='bill-title'>รายการที่ #{selectedOrder.order.id}</h2>
              <p className='history-date'>{formatDate(selectedOrder.order.created_at)}</p>

              <div className='bill-list'>
                {selectedOrder.items.map((item, i) => (
                  <div className='bill-item' key={i}>
                    <span className='bill-item-emoji'>{item.emoji}</span>
                    <div className='bill-item-info'>
                      <p className='bill-item-name'>{item.name}</p>
                      <p className='bill-item-sub'>฿ {item.price_at_order} × {item.qty}</p>
                    </div>
                    <span className='bill-item-price'>
                      ฿ {(item.price_at_order * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className='bill-total'>
                <span>รวมทั้งหมด</span>
                <strong>฿ {Number(selectedOrder.order.total).toFixed(2)}</strong>
              </div>

              <button className='pd-btn' onClick={() => setSelectedOrder(null)}>
                กลับไปหน้าขาย
              </button>
            </>
          ) : (
            <>
              <h2 className='bill-title'>รายการที่สั่ง</h2>

              {order.length === 0 ? (
                <p className='bill-empty'>ยังไม่มีรายการ</p>
              ) : (
                <div className='bill-list'>
                  {order.map((item) => (
                    <div className='bill-item' key={item.id}>
                      <span className='bill-item-emoji'>{item.emoji}</span>
                      <div className='bill-item-info'>
                        <p className='bill-item-name'>{item.name}</p>
                        <p className='bill-item-sub'>฿ {item.price} × {item.qty}</p>
                      </div>
                      <div className='bill-item-qty'>
                        <button className='qty-btn' onClick={() => handleDecrease(item.id)}>-</button>
                        <span className='qty-value'>{item.qty}</span>
                        <button className='qty-btn' onClick={() => handleAdd(item)}>+</button>
                      </div>
                      <span className='bill-item-price'>฿ {(item.price * item.qty).toFixed(2)}</span>
                      <button className='bill-item-remove' onClick={() => handleRemove(item.id)}>✕</button>
                    </div>
                  ))}
                </div>
              )}

              <div className='bill-total'>
                <span>รวมทั้งหมด</span>
                <strong>฿ {total.toFixed(2)}</strong>
              </div>

              <button
                className='bill-checkout-btn'
                disabled={order.length === 0 || checkingOut}
                onClick={handleCheckout}
              >
                {checkingOut ? 'กำลังบันทึก...' : 'ชำระเงิน'}
              </button>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default POSView;