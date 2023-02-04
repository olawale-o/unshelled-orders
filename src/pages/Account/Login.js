import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/accountService";
import { useAccount } from "../../provider/AccountProvider";

const AccountLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAccount();
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
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
      const response = loginService({
        username: formValues.username,
        password: formValues.password,
      });
      if (response) {
        setUser({
          ...response.seller,
          token: response.token,
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
              type="text" name="username" placeholder="Username" value={formValues.username}
              onChange={onFormChange}
            />
          </div>
          <div className="field">
            <input
              type="password" name="password" placeholder="Password" value={formValues.password}
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

export default AccountLogin;