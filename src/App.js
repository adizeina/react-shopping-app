import React from 'react';
import data from "./data.json";
import Products from "./components/Products";
import Filter from './components/Filter'
import Cart from './components/Cart'

// I want to update 
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      // to store cart items so it doesn't disappear on refresh --> if the cart is not empty then parse, else --> empty array
      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[], 
      size:"",
      sort:"",
    };
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort, 
      products: this.state.products
      .slice()
      .sort((a,b) =>
        sort === "lowest"
          ? a.price > b.price
            ? 1
            :-1
        : sort === "highest"
        ? a.price < b.price
          ? 1
          :-1
        : a._id < b._id
          ? 1
          :-1
      ),
    }));
  };

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

  filterProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value ===""){
      this.setState({size: event.target.value, product: data.products});
    } else {
    this.setState({
      size: event.target.value, 
      products: data.products.filter(
        (product) => product.availableSizes.indexOf(event.target.value) >=0 
      ), 
  });
};
};
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter((x) => x._id !== product._id), 
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x) => x._id !== product._id)));  //because we set the state when filtering so it has to be "this.state.cartItems"
  };



  render(){
  return (
    <div className="grid-container">
      <header>
        <a className = "name-site" href ="/">ShoeShop</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter count = {this.state.products.length}   //num of products
            size={this.state.size}
            sort = {this.state.sort}
            filterProducts={this.filterProducts}
            sortProducts={this.sortProducts}></Filter>
            <Products products = {this.state.products} addToCart={this.addToCart}></Products>
          </div>

          <div className="sidebar">
            <Cart cartItems={this.state.cartItems} removeFromCart = {this.removeFromCart} />
          
          </div>

        </div>
      </main>
      <footer>Copyright - All rights reserved</footer>
    </div>
  );
}
}
export default App;