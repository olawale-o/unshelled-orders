import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateAccountService } from "../../services/accountService";
import { useAccount } from "../../provider/AccountProvider";

const AccountProfile = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { user, setUser } = useAccount();
  const [formValues, setFormValues] = useState({
    sellerCity: "",
    sellerState: "",
  });
  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      const response = updateAccountService({
        sellerCity: formValues.sellerCity,
        sellerState: formValues.sellerState,
      }, user.token);
      if (response) {
        setUser({
          ...user,
          ...response.seller,
        });
        navigate("/order_items");
      }
    } catch (e) {
      console.log(e);
    }
    
  };
  return (
    <div className="container">
      {error && <div className="error">{error}</div>}
      <h1>Update profile</h1>
      <div className="form-container">
        <form className="form" onSubmit={handleFormSubmit}>
          <div className="field">
            <input
              type="text" name="sellerCity" placeholder="Seller city" value={formValues.sellerCity}
              onChange={onFormChange}
              required
            />
          </div>
          <div className="field">
            <input
              type="text" name="sellerState" placeholder="Seller state" value={formValues.sellerState}
              onChange={onFormChange}
              required
            />
          </div>
          <div className="field">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountProfile;
