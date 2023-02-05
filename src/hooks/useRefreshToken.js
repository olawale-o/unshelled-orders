import { useAccount } from '../provider/AccountProvider';
import { api } from '../api';

const useRefreshToken = () => {
  const { setUser } = useAccount();
  const refresh = async () => {
    const response = await api.get('/account/token/refresh', { withCredentials: true });
    setUser((prev) => ({ ...prev, token: response.data.accessToken, ...response.data.seller }));
    return response.data.accessToken;
  }
  return refresh;
};

export default useRefreshToken;