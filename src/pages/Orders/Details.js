import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAccount } from "../../provider/AccountProvider";
import { getSingeleOrderService, deleteOrderService } from "../../services/orderService";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { user } = useAccount();
  const { id } = useParams();
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const fetchOrders = async (token) => {
      setLoading(true);
      try {
        const response = await getSingeleOrderService(token, id);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) {

      fetchOrders(user.token);
    }
  }, []);

  const handleDelete = async () => {
    try {
      const response = await deleteOrderService(user?.token, id);
      if (response) {
        alert("Orders deleted");
        navigate("/order_items");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!loading && (<div className="order">
        <div className="order-action">
          <button className="btn btn-edit">Edit</button>
          <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
        </div>
        <table className="orders">
          <thead>
            <tr>
              <th>id</th>
              <th>Product id</th>
              <th>Price</th>
              <th>Date</th>
              <th>Product category</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr className="order" key={i}>
                <td>{order.id}</td>
                <td>{order.product_id}</td>
                <td>$ {order.price}</td>
                <td>{order.date}</td>
                <td>{order.product_category_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}
      {loading && <div className="loading loading-lg"></div>}
    </>
  );
};

export default OrderDetails;
