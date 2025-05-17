import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useSelector, useDispatch } from 'react-redux';
import { decreseCart, dltFromcart, updateCart } from '../context/ReduxSlice';


const Cart = () => {

  // REDUX
  const dataCart = useSelector((state) => state.cart.cart)
  // console.log(dataCart, "data");

  const dispatch = useDispatch()


  const { products, currency, navigate, cartItems, updateQuantity } = useContext(ShopContext);

  // console.log(products, "products");

  const [cartData, setCartData] = useState([]);

  // useEffect(() => {
  //   const tempData = []
  //   for (const items in cartItems) {
  //     for (const item in cartItems[items]) {
  //       if (cartItems[items][item] > 0) {
  //         tempData.push({
  //           _id: items,
  //           size: item,
  //           quantity: cartItems[items][item]
  //         })
  //       }
  //     }
  //   }
  //   setCartData(tempData)
  // }, [cartItems,amount])

  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {dataCart.map((item, index) => {

          // const sameProduct = products.find((products) => products?._id === item?.productData._id);
          // console.log(item);

          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={item?.productData?.image[0]} alt="" />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{item?.productData?.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{item?.productData?.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item?.size}</p>
                    
                  </div>
                </div>
              </div>
              {/* <input onChange={(e) => {
                if(e.target.value === 0){
                  dispatch(dltFromcart(item))
                }
                else{
                  dispatch(updateCart(item))
                }
                }} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} value={item?.quantity} /> */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (item.quantity > 1) {
                      dispatch(decreseCart(item));
                    } else {
                      dispatch(dltFromcart(item));
                    }
                  }}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span className="min-w-[24px] text-center">{item.quantity}</span>
                <button
                  onClick={() => {
                    dispatch(updateCart(item));
                  }}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <img onClick={() => dispatch(dltFromcart(item))} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="delete" />
            </div>
          )

        })}
      </div>

      {/* <div>
        {cartData.map((item, index) => {

          const productData = products.find((product) => product._id === item._id);

          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
              <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
            </div>
          )

        })}
      </div> */}

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Cart
