import React, { useReducer } from 'react';
import './Product.css';

const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}

function getTotal(cart) {
    const total = cart.reduce((totalCost, item) => totalCost + item.price, 0)
    return total.toLocaleString(undefined, currencyOptions)
    
}

const products = [
  {
      emoji: '🍨',
      name: 'ice cream',
      price: 5
    },
    {
      emoji: '🍩',
      name: 'donuts',
      price: 2.5
    },
    {
      emoji: '🧇',
      name: 'waffle',
      price: 2
    },
    {
      emoji: '🌮',
      name: 'taco',
      price: 4.5
    },
    {
      emoji: '🍹',
      name: 'drink',
      price: 1.5
    },
    {
      emoji: '☕',
      name: 'coffe',
      price: 3
    }
  ];

  function cartReducer(state, action) {
      switch(action.type){
          case 'add':
              return [...state, action.product]
            case 'remove':
                const productIndex = state.findIndex(item => item.name === action.product.name)
                if(productIndex < 0){
                    return state
                }
                const update = [...state]
                update.splice(productIndex, 1)
                return update
            default:
                return state
      }
  }

  export default function Product() {
    const [cart, setCart] = useReducer(cartReducer, []);
  
    function add(product) {
      setCart({product, type: 'add'});
    }

    function remove(product) {
        setCart({product, type: 'remove'})
    }
  
    return(
      <div className="wrapper">
        <div>
          Seu Carrinho: {cart.length} itens.
        </div>
        <div>Valor Total: R$ {getTotal(cart)}.</div>
          <div>
          {products.map(product => (
            <div key={product.name}>
              <div className="product">
                <span role="img" aria-label={product.name}>{product.emoji}</span>
              </div>
              <button onClick={() => add(product)} >Adicionar</button>
              <button onClick={() => remove(product)} >Remover</button>
            </div>
          ))}
        </div>
      </div>
    )
  }