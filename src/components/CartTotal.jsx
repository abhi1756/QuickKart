import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import { useSelector } from 'react-redux'

const CartTotal = () => {

    const { currency,delivery_fee,getCartAmount } = useContext(ShopContext);
    const amount = useSelector((state) => state.cart?.totalPrice)
    

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {amount}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Free</p>
                    <p>{currency} {delivery_fee}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {amount === 0 ? 0 : amount + delivery_fee}.00</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal
