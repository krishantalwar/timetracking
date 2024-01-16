import { useLoginMutation, useLogoutMutation, useMeQuery } from './authService';

export const useLogin = () => {
  const [loginMutation] = useLoginMutation();
  console.log("asdasd");
  const login = async (credentials) => {
    console.log(credentials);
    try {
      const result = await loginMutation(credentials);
      console.log(result);
      return result.data;
    } catch (error) {
      throw error;
    }
  };

  return { login };
};

export const useLogout = () => {
  const logoutMutation = useLogoutMutation();

  const logout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      throw error;
    }
  };

  return { logout };
};

export const useAuth = () => {
  const { data: user } = useMeQuery();
  const isAuthenticated = !!user;

  return { user, isAuthenticated };
};
