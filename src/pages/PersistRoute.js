import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import { useAccount } from '../provider/AccountProvider';

const PersistAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { user, setUser } = useAccount();
  useEffect(() => {
    let isMounted = true;
  
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      }
      catch (err) {
        setUser(null);
      }
      finally {
        isMounted && setIsLoading(false);
      }
    }
  
   !user?.token ? verifyRefreshToken() : setIsLoading(false);
   return () => isMounted = false;
  }, []);

  return (
    <>
      {isLoading ? (<h1>isLoading.....</h1>) : <Outlet />}
    </>
  );
};

export default PersistAuth;