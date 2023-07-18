// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         console.log("1  ");
//         const response = await axios.get(
//           "http://localhost:9003/api/v1/sales/items",
//         );
//         setCartItems(response.data.data);
//         console.log(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const handleRemoveItem = async (itemId) => {
//     try {
//       await axios.delete(`http://localhost:9003/api/v1/sales/items/${itemId}`);
//       setCartItems((prevItems) =>
//         prevItems.filter((item) => item._id !== itemId),
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (cartItems.length === 0) {
//     return <div>No items in the cart</div>;
//   }

//   return (
    // <div>
    //   <h2>Cart</h2>
    //   {cartItems.map((item) => (
    //     <div key={item._id}>
    //       <h3>{item.event.eventName}</h3>
    //       <p>Date: {item.event.eventDate}</p>
    //       <p>Location: {item.event.eventLocation}</p>
    //       <p>Price: {item.event.price}</p>
    //       <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
    //     </div>
    //   ))}
    // </div>
//   );
// };

// export default CartPage;
