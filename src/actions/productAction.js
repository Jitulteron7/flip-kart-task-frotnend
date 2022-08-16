import axios from "axios";
import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    CLEAR_ERRORS,    
} from "../constants/productConstants";

// Get All Products --- Filter/Search/Sort
export const getProducts =
    (category, sortBy, brands, offers, price, ratings, currentPage=1) => async (dispatch) => {
        try {

            console.log(sortBy,brands,ratings,offers,"action");
            dispatch({ type: ALL_PRODUCTS_REQUEST });

            let url = `https://aqueous-anchorage-64649.herokuapp.com/filterAndSort`;
                        
            const { data } = await axios.post(url,{
                filter:{
                    sortBy: sortBy,
                    filterBy: { brand: brands, rating: ratings, offers: offers },
                    pageNo:currentPage
                  }
            });

            console.log(data.data[0].data,"data");
            console.log(data.data[0].metadata,"metadata");
            dispatch({
                type: ALL_PRODUCTS_SUCCESS,
                payload: data.data[0],
            });
        } catch (error) {
            console.log(error,"product error")
            dispatch({
                type: ALL_PRODUCTS_FAIL,
                payload: error.response.data.message,
            });
        }
    };



// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}