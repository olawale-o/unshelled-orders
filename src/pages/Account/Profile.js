import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateAccountService } from "../../services/accountService";
import { useAccount } from "../../provider/AccountProvider";

const AccountProfile = () => {
  const navigate = useNavigate();
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
    console.log(formValues);
    try {
      const response = updateAccountService({
        sellerCity: formValues.sellerCity,
        sellerState: formValues.sellerState,
      });
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
    <div>
      <h1>Account Login</h1>
      <div className="form-container">
        <form className="form" onSubmit={handleFormSubmit}>
          <div className="field">
            <input
              type="text" name="sellerCity" placeholder="Seller city" value={formValues.sellerCity}
              onChange={onFormChange}
            />
          </div>
          <div className="field">
            <input
              type="text" name="sellerState" placeholder="Seller state" value={formValues.sellerState}
              onChange={onFormChange}
            />
          </div>
          <div className="field">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountProfile;
