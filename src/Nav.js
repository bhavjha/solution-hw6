import React, { Component } from 'react';
import './Nav.css';


class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartState : true,

    }
}

  
cartHide = () => {
  let cart = document.getElementById("cart-top-list");
  if(this.state.cartState)
  {
    cart.style.display = 'none';
    this.setState(prevState => ({
      ...prevState,
      cartState: false
    }))
  }
  else
  {
    cart.style.display = 'block';
    this.setState(prevState => ({
      ...prevState,
      cartState: true
    }))  }
}

  render() {
    return(
       
        <div className="navcontainer"> 
        <div className="logo">
          <img className="logo-thumbnail" src={process.env.PUBLIC_URL + '/assets/img/logo-01.svg'} alt="Logo icon"/>
        </div>

        <div className="nav">
          <div className="pages">
            <p className="nav-items">PRODUCTS</p>
            <p className="nav-items"  onClick={this.cartHide}>CART</p>
            {this.state.displayCart} 

          </div>

        {/* <div className="cart-summary">
          <p id="cart-summary-items" className="cart-summary-items">0 items</p>
          <p id="cart-summary-items-total" className="cart-summary-items">Total: $0.00</p>
        </div>  */}

        <div className="popup">
          <span className="popuptext" id="popupSummary"><p>Added to cart:</p><p className="summaryOfRoll"></p>
          </span>
        </div>

          <div>
            <hr/>
          </div>

          <div className="phrase">
            <p>
                Our hand-made cinnamon rolls
            </p>
          </div>
        </div>

      </div>
    );
  }
}

export default Nav;