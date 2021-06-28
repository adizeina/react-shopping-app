import React from 'react';
// import data from "./data.json";  --> no longer need because the data comes from the back end 
import Products from "./components/Products";
import Filter from './components/Filter'
import Cart from './components/Cart'
import store from './store';
import {Provider} from 'react-redux';

// I want to update 
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      //products: data.products,     comes from backend now
      // to store cart items so it doesn't disappear on refresh --> if the cart is not empty then parse, else --> empty array
      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[], 
      // size:"",   no longer needed because we use Redux store now
      // sort:"",   no longer needed because we use Redux store now
    };
  }
/////// NO longer needed due to Redux 
  // sortProducts = (event) => {
   //  const sort = event.target.value;
   //  console.log(event.target.value);
   //  this.setState((state) => ({
   //  sort: sort, 
   //  products: this.state.products
   //   .slice()
   //   .sort((a,b) =>
    //    sort === "lowest"
   //       ? a.price > b.price
    //        ? 1 :-1
     //   : sort === "highest"
     //   ? a.price < b.price
     //     ? 1 :-1
     //   : a._id < b._id
     //     ? 1:-1
    //  ), }));   };

  addToCart = (product) =>{
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item =>{
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart){
      cartItems.push({...product, count: 1});   //adds an instance of that item and sets its quantity to 1
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));   //to stop cartItems from disappearing on refresh
  };


////// NO longer needed due to Redux 
//filterProducts = (event) => {
    //console.log(event.target.value);
   // if (event.target.value ===""){
    //  this.setState({size: event.target.value, product: data.products});
   // } else {
   // this.setState({
    //  size: event.target.value, 
    //  products: data.products.filter(
    //    (product) => product.availableSizes.indexOf(event.target.value) >=0 
  //    ), 
 // });
//};
//};
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter((x) => x._id !== product._id), 
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x) => x._id !== product._id)));  //because we set the state when filtering so it has to be "this.state.cartItems"
  };

  createOrder = (order) =>{
    alert("Need to save order for " + order.name);
  };



  render(){
  return (
    <Provider store ={store}>
    <div className="grid-container">
      <header>
        <a className = "name-site" href ="/">ShoeShop</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter></Filter>
            <Products addToCart={this.addToCart}></Products>
          </div>

          <div className="sidebar">
            <Cart 
              cartItems={this.state.cartItems} 
              removeFromCart = {this.removeFromCart}
              createOrder= {this.createOrder}/>
          
          </div>

        </div>
      </main>
      <footer>Copyright - All rights reserved</footer>
    </div>
    </Provider>
  );
}
}
export default App;
