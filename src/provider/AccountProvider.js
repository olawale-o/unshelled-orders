import { createContext, useContext, useState } from "react";

export const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

const AccountProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AccountContext.Provider value={{
      user,
      setUser,
    }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
