import React, { useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import Order from './Order';

const showOrders = (props) => {
  let summa = 0
  props.orders.forEach(el => summa += Number.parseFloat(el.price))
  return (<div>
    {props.orders.map(el => (
       <Order onDelete={props.onDelete} key={el.id} item={el} />
      ))}
      <p className='summa'>Сумма: {new Intl.NumberFormat().format(summa)}$</p>
  </div>)
}

const showNothing = () => {
  return (<div className='empty'>
    <h2>Товаров нет</h2>
  </div>)
}

export default function Header(props) {
  const [cartOpen, setCartOpen] = useState(false);
  const handleSearchChange = (event) => {
    const query = event.target.value;
    props.onSearch(query); // вызываем обработчик поиска при изменении значения в поле ввода
  };

  return (
    <header>
        <div>
            <span className='logo'>House Staff</span>
            <ul className='nav'>
                <li>Про нас</li>
                <li>Контакты</li>
                <li>Кабинет</li>
            </ul>
            <input
          type="text"
          placeholder="Поиск по названию"
          onChange={handleSearchChange}
        />
            <FaShoppingCart
        onClick={() => setCartOpen(!cartOpen)} // Использование состояния для отображения/скрытия корзины
        className={`shop-cart-button ${cartOpen && 'active'}`}
      />
            {cartOpen && (
              <div className='shop-cart'>
                {props.orders.length > 0 ?
                showOrders(props) : showNothing()}
              </div>
            )}
        </div>
        <div className='presentation'></div>
    </header>
  )
}

