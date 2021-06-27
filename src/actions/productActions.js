import { FETCH_PRODUCTS } from "../types";


//Action creators have been created (off Redux Diagram)
export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("/api/products");
    const data = await res.json();
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data, 
    });
};