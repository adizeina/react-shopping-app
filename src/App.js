import React from 'react';
// import data from "./data.json";  --> no longer need because the data comes from the back end 
import Products from "./components/Products";
import Filter from './components/Filter'
import Cart from './components/Cart'
import store from './store';
import {Provider} from 'react-redux';

// I want to update 
class App extends React.Component {
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
            <Products></Products>
          </div>

          <div className="sidebar">
            <Cart />
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
