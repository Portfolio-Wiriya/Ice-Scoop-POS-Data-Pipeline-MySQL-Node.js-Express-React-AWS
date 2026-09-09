CREATE DATABASE ice_scoop_db;

USE ice_scoop_db;

CREATE TABLE products (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    emoji VARCHAR(30) NOT NULL,
    category ENUM('flavor', 'container', 'topping') NOT NULL,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- bill 1 bill 
CREATE TABLE orders (
	id INT AUTO_INCREMENT PRIMARY KEY,
    total DECIMAL(10,2) NOT NULL,
	status ENUM('paid', 'cancelled') DEFAULT 'paid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- รายการสินค้าใน bill
CREATE TABLE order_items (
	id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    qty INT NOT NULL,
    price_at_order DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
); 

INSERT INTO products (name,price,category, emoji, in_stock) VALUES
('vanilla', 10, 'flavor', '🍦', TRUE),
('chocolate', 10, 'flavor', '🍫', TRUE),
('strawberry', 10, 'flavor', '🍓', TRUE),
('matcha', 15, 'flavor', '🍵🍃', TRUE),
('cookies', 15, 'flavor', '🍪', TRUE),
('coconut', 15, 'flavor', '🥥', TRUE),
('cup', 0, 'container', '🥣', TRUE),
('cone', 5, 'container', '🍧', TRUE),
('bigcone', 10, 'container', '🍨', TRUE),
('chocolatesauce', 0, 'topping', '🍫🍫', TRUE),
('strawberrysauce', 0, 'topping', '🍓🍓', TRUE),
('sprinkles', 0, 'topping', '🌈🌈', TRUE),
('buttercookie', 25, 'topping', '🍪🧈', TRUE),
('brownies', 15, 'topping', '🍫🍰', TRUE);

SELECT * FROM products;
SELECT * FROM order_items;

SHOW TABLES;
DESCRIBE order_items;