import React, { Component } from 'react';
import './Cart.css';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cartTotal:0,
            //cartArray: [], //JSON.parse(localStorage.getItem("cartArray")) ||
            cartItems:0
        };   
      }

      edgeCart = () => {
        if(this.props.cartArray.length===0)
        {
         const cartTopTextID = document.getElementById('cart-top-items');
         cartTopTextID.innerText = 'The cart is empty!';
        }
      }


      calcCartTotal = () => {
        let newPrice = 0.0;
        this.props.cartArray.map((roll) => 
        {
        let currentPrice = parseFloat((roll.rollprice).slice(2)); // 19.994058346473974957569
        currentPrice = currentPrice.toFixed(2); // "19.99"
        currentPrice = Number(currentPrice);  // 19.99
        newPrice += parseFloat( roll.rollpack * currentPrice);
        })
        this.state.cartTotal = newPrice;
        console.log('cart total from function =', newPrice, this.props.cartTotal);
        return newPrice;
      }

    render() {
        return(
            <div className='cart-top-list' id="cart-top-list">
                <hr className='cart-top-boundary'></hr>
                <div className='cart-top-summary'>
                    <p id="cart-top-summary-items">Shopping cart ({this.props.cartArray.length} items)</p>
                    {/* <p id="cart-top-summary-items-total">Total: $ <span id="priceupdated">{this.props.cartTotal}</span></p> */}
                    <p id="cart-top-summary-items-total">Total: $ <span id="priceupdated">{this.calcCartTotal()}</span></p>

                </div>
                <div>
                
                </div>
                <div id='cart-top-items'>
                        {
                            this.props.cartArray.map((roll, idx) => 
                            {
                              //console.log(roll)
                              return (
                                  <div className='cart-top-item'>
                                    <img src={process.env.PUBLIC_URL+ roll.rollimg} className="cart-top-summary-image" alt='summary' />
                                    <div>{roll.rollname}</div>
                                    <div>Glazing: {roll.rollglaze}</div>
                                    <div>Pack size: {roll.rollpack}</div>
                                    <div><b>{roll.rollprice}</b></div>
                                    <button type="button" id="removeFromCart" onClick={() => this.props.removeFromCart(idx)}>Remove</button>
                                  </div>
                                )
                            })
                        }
                </div>
                <hr className='cart-top-boundary'></hr>

            </div>
        );
    }
}

export default Cart;
