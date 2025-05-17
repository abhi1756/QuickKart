import { createSlice, current } from "@reduxjs/toolkit";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

const initialState = {
    cart : [],
    totalPrice : 0,
    totalQuantity : 0
};

const userSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCar: (state, action) => {
            if(!action.payload.size){
                toast.error("Select the Size!!!!")
                return
            }
            const ind = state.cart.findIndex(item => action.payload.productData._id === item.productData._id && action.payload.size === item.size)
            if(ind != -1){
                state.cart[ind].quantity += 1
                
            }
            else state.cart.push({...action.payload,'quantity' :1})
            
            state.totalPrice += action.payload.productData.price
            state.totalQuantity += 1;
            toast.success("Added to cart")
        },
        dltFromcart: (state,action) => {
            
            const ind = state.cart.findIndex(item => action.payload.productData._id === item.productData._id && action.payload.size === item.size)
            // console.log(ind);
            
            // state.cart.filter((item) => action.payload.productData._id === item.productData._id && action.payload.size === item.size)
            state.totalPrice -= action.payload.productData.price*state.cart[ind].quantity
            state.totalQuantity -= state.cart[ind].quantity
            // delete state.cart[ind]
            state.cart.splice(ind, 1); 
            // console.log(current(state));
        },
        updateCart: (state,action) => {
            const ind = state.cart.findIndex(item => action.payload.productData._id === item.productData._id && action.payload.size === item.size)
            // console.log(action.payload);
            
            state.cart[ind].quantity += 1
            state.totalPrice += action.payload.productData.price
            state.totalQuantity += 1
        },
        decreseCart: (state,action) => {
            const ind = state.cart.findIndex(item => action.payload.productData._id === item.productData._id && action.payload.size === item.size)

            state.cart[ind].quantity -= 1
            state.totalPrice -= action.payload.productData.price
            state.totalQuantity -= 1
        }
    }
})

export const {addToCar,dltFromcart, updateCart,decreseCart} = userSlice.actions

export default userSlice.reducer