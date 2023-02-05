import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useAccount } from "../../provider/AccountProvider";
import { getOrdersService } from "../../services/orderService";

const Orders = () => {
  const sellerId = localStorage.getItem('seller_id');
  const { user } = useAccount();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState('price');
  useEffect(() => {
    const fetchOrders = async (token) => {
      setLoading(true);
      try {
        const response = await getOrdersService(token,
          {
            page: currentPage,
            items_per_page: itemsPerPage,
            sort_by: sortBy,
          }
        );
        if (response.total % itemsPerPage === 0) {
          setTotalPages(response.total / itemsPerPage);
        } else {
          setTotalPages(Math.floor(response.total / itemsPerPage) + 1);
        }
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
  }, [user, currentPage, itemsPerPage, sortBy, sellerId]);
  const onPageChange = async (page) => {
    setCurrentPage(page);
  };
  if (!user?.token && !loading) {
    return (
      <div className="content">
        <div className="error">You need to be logged in to access this page</div>
        <Link to="/">Login</Link>
      </div>
    );
  }
  return (
    <>
    {(orders.length < 1 && !loading) && <div className="error">No orders found</div>}
    {orders.length > 0 && (
      <>
        <div className="filter">
          <div className="field">
            <select onChange={(e) => {
              if (e.target.value.trim() !== '') {
                setItemsPerPage(e.target.value);
              }
            }}>
              <option value="">Items Per Page</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="field">
            <select onChange={(e) => {
              if (e.target.value.trim() !== '') {
                setSortBy(e.target.value);
              }
            }}>
              <option value="">Sort by</option>
              <option value="price">Price</option>
              <option value="data">Shipping Limit Date</option>
            </select>
          </div>
        </div>
        <table className="orders">
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Id</th>
              <th>Price</th>
              <th>Date</th>
              <th>Product category</th>
              <th>Action</th>
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
                <td>
                  <Link to={`/order_items/${order.id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={currentPage} totalPages={totalPages} setPage= {onPageChange} />
      </>
    )}
      {loading && <div className="loading loading-lg"></div>}
    </>
  );
};

export default Orders;

