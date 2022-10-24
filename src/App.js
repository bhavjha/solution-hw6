import React, { Component } from 'react';

import './App.css';

import Nav from './Nav.js'
import Roll from './Roll.js';
import Cart from './Cart.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rollData: [
        {
          imageURL: "/assets/img/original-cinnamon-roll.jpg",
          rollName: "Original cinnamon roll",
          rollPrice: "$ 2.49"
        },
        {
          imageURL: "/assets/img/apple-cinnamon-roll.jpg",
          rollName: "Apple cinnamon roll",
          rollPrice: "$ 3.49"
        },
        {
          imageURL: "/assets/img/raisin-cinnamon-roll.jpg",
          rollName: "Raisin cinnamon roll",
          rollPrice: "$ 2.99",
  
        },
        {
          imageURL: "/assets/img/walnut-cinnamon-roll.jpg",
          rollName: "Walnut cinnamon roll",
          rollPrice: "$ 3.49"
        },
        {
          imageURL: "/assets/img/double-chocolate-cinnamon-roll.jpg",
          rollName: "Double Chocolate cinnamon roll",
          rollPrice: "$ 3.49"
        },
        {
          imageURL: "/assets/img/strawberry-cinnamon-roll.jpg",
          rollName: "Strawberry  cinnamon roll",
          rollPrice: "$ 3.99"
        }
        
      ],
      selectedRollIndex: null,
      glazingType: "Keep Original",
      packSize: 1,
      // cartArray : [], //[],
      cartArray : JSON.parse(localStorage.getItem("cartArray")) || [], //[],
      sortType : 'Name',
      searchValue : '',
      cartTotal : 0,
      cartItems :0,
      sortedArray : []

    }
  }

  componentDidMount() {
    localStorage.setItem("cartArray", JSON.stringify(this.state.cartArray));
  }

  componentDidUpdate() {
    localStorage.setItem("cartArray", JSON.stringify(this.state.cartArray));
  }
 
      
 popUpSummary = (name,glaze,pack,price) => {
  let popup = document.getElementById("popupSummary");
  popup.innerHTML = "<b>" +name + "</b>" + "</br>" + glaze + "<br/>" + "Pack of " + pack + "<br/>Price: " + price;
  popup.classList.toggle("show");
}

 popUpHide = () => {
  let popup = document.getElementById("popupSummary");
  popup.style.display='none';
}


  addToCart = ( image, name, glaze, pack, price) => {

    const rollobj = 
    {
      rollimg: image,
      rollname: name,
      rollglaze: glaze,
      rollpack: pack,
      rollprice: price
    }
    //console.log('rollobj',rollobj);

      //add to array 
      this.state.cartArray.push(rollobj);
      
      //call popup with the new object - loop over objects to get total price
      this.popUpSummary(name, glaze, pack, price);
      setTimeout(this.popUpHide,3000);


      let currentPrice = parseFloat((rollobj.rollprice).slice(2)); // 19.994058346473974957569
      currentPrice = currentPrice.toFixed(2); // "19.99"
      currentPrice = Number(currentPrice);  // 19.99
      this.state.cartTotal += currentPrice;
      this.state.cartItems +=1;

      this.setState(prevState => ({
        ...prevState,
        //rollData: newRollData,
        cartArray: [...this.state.cartArray], //[...prevState.cartArray, rollobj],
        glazingType: "",
        packSize: "",
        selectedRollIndex: null,
        cartItems: this.state.cartItems,
        cartTotal: this.state.cartTotal
      }), 
      ()=>{


      }
      )
  }


  handleSort = (sortBy) => {
    let sortedItems = []
    this.state.sortedArray = this.state.rollData;
    switch(sortBy.target.value){
      case "Name":
        sortedItems = this.state.sortedArray.sort((a,b) => a.rollName.toLowerCase() >= b.rollName.toLowerCase() ? 1 : -1)
        //console.log('sortedItems in name = ',sortedItems)
        break
      case "Base Price":
        sortedItems = this.state.sortedArray.sort((a,b) => a.rollPrice.slice(2) - b.rollPrice.slice(2))
        break
      default:
        //console.log("Not an option")
        sortedItems = this.state.rollData
      }
      this.setState({
        sortedArray: sortedItems,
        rollData:sortedItems,
        sortType:sortBy
      })
      //console.log(' sortedArray', sortedItems);
  }


  handleSearch = (event) => {
    let searchInput = document.getElementById("search-input");

    // access input values here
    const searchText = searchInput.value.toLowerCase();

    this.setState(prevState => ({
      ...prevState,
      searchValue: searchText
    }))
  }

  removeButtonHandler = (rollIndex) => {

    console.log("INDEX,", rollIndex);
    let newRollData = this.state.cartArray;
    newRollData.splice(rollIndex, 1);

    let newPrice = 0.0;
    newRollData.map((roll) => 
      {
        //console.log(" roll.rollprice=,", roll.rollprice, "roll.rollpack=", roll.rollpack);
        //console.log("type roll.rollprice=,", typeof(roll.rollprice), "roll.rollpack=", typeof(roll.rollpack));

        let currentPrice = parseFloat((roll.rollprice).slice(2)); // 19.994058346473974957569
        currentPrice = currentPrice.toFixed(2); // "19.99"
        currentPrice = Number(currentPrice);  // 19.99

        newPrice += parseFloat( roll.rollpack * currentPrice);
             
      })
      //console.log('current array lenght = ', newRollData.length, 'newroll data=', newRollData);

    this.setState(prevState => ({
      ...prevState,
      cartArray: newRollData,
      cartTotal: newPrice,
      cartItems: newRollData.length 
    })
    )

  }

  render() {
    return (
      <div className="App">
        <Nav 

        />

        <Cart 
          cartTotal={this.state.cartTotal} 
          cartArray={this.state.cartArray} 
          removeFromCart={this.removeButtonHandler}
          cartItems={this.state.cartItems}
          />

      <div className="searchsort">
        <div className="search">
                <input type="text" name="search" id="search-input" />
                <button className="search-button" onClick={this.handleSearch}>
                    Search
                </button>
        </div>
        <div className="sortRollClass">
        <label htmlFor="sort-by" id="sortText">sort by:</label>
                    <select name="sort-by" id="sortRoll" onChange={this.handleSort} value={this.state.sortType}>
                      <option value="Base Price">Base Price</option>
                      <option value="Name">Name</option>
                    </select>
        </div>

      </div>        
          <div className="gallery">
                  { 
                  this.state.rollData.map(
                  (roll, idx) => {
                    let check=0;

                    if(check==1) 
                    { return <div>No match!</div> }

                    if ((this.state.searchValue == '') || 
                    (this.state.rollData[idx].rollName.toLowerCase().includes(this.state.searchValue))) 
                     {
                      return <Roll 
                      key={idx}
                      rollIndex={idx}
                      imageURL={roll.imageURL}
                      rollName={roll.rollName}
                      rollPrice={roll.rollPrice}
                      onAdd={this.addToCart}
                      onRemove={this.removeButtonHandler} 
                      />
                     } 
                     else {
                      check = check +1; //console.log('check = ',check);
                      return <div />
                      }
                  }
                  )}


                   {/* <Roll
                      rollIndex={0}
                      imageURL={this.state.rollData[0].imageURL}
                      rollName={this.state.rollData[0].rollName}
                      rollPrice={this.state.rollData[0].rollPrice}
                      glazingType={this.state.rollData[0].glazingType} 
                      packSize={this.state.rollData[0].packSize}
                      onAdd={this.addToCart}
                   />
                   <Roll
                      rollIndex={1}
                      imageURL={this.state.rollData[1].imageURL}
                      rollName={this.state.rollData[1].rollName}
                      rollPrice={this.state.rollData[1].rollPrice}
                      glazingType={this.state.rollData[1].glazingType} 
                      packSize={this.state.rollData[1].packSize} 
                      onAdd={this.addToCart}
                   />
                   <Roll
                      rollIndex={2}
                      imageURL={this.state.rollData[2].imageURL}
                      rollName={this.state.rollData[2].rollName}
                      rollPrice={this.state.rollData[2].rollPrice}
                      glazingType={this.state.rollData[2].glazingType} 
                      packSize={this.state.rollData[2].packSize} 
                      onAdd={this.addToCart}
                   /> */}
             
                   {/* <Roll
                      rollIndex={3}
                      imageURL={this.state.rollData[3].imageURL}
                      rollName={this.state.rollData[3].rollName}
                      rollPrice={this.state.rollData[3].rollPrice}
                      glazingType={this.state.rollData[3].glazingType} 
                      packSize={this.state.rollData[3].packSize} 
                      onAdd={this.addToCart}
                   />
                   <Roll
                      rollIndex={4}
                      imageURL={this.state.rollData[4].imageURL}
                      rollName={this.state.rollData[4].rollName}
                      rollPrice={this.state.rollData[4].rollPrice}
                      glazingType={this.state.rollData[4].glazingType} 
                      packSize={this.state.rollData[4].packSize} 
                      onAdd={this.addToCart}
                   />
                   <Roll
                      rollIndex={5}
                      imageURL={this.state.rollData[5].imageURL}
                      rollName={this.state.rollData[5].rollName}
                      rollPrice={this.state.rollData[5].rollPrice}
                      glazingType={this.state.rollData[5].glazingType} 
                      packSize={this.state.rollData[5].packSize} 
                      onAdd={this.addToCart}
                   /> */}
            </div>
      </div>
    );
  }
  
}

export default App;
