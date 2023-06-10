import { UserType } from "@royal/shared";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { HOME_AXIOS_CLIENT } from "../lib/axios";

type UseSessionOptions = {
    redirectTo: string;
    redirectIfFound?: boolean;
    redirectIfNotFound?: boolean;
};
type IUseSession = {
    userData?: Omit<UserType, 'password'>;
};

export default function useSession({
    redirectTo,
    redirectIfFound,
    redirectIfNotFound
}: UseSessionOptions = {redirectTo: '/login', redirectIfFound: false, redirectIfNotFound: false}): IUseSession {
    const navigate = useNavigate();
    const { data:user} = useQuery<Omit<UserType, "password">, AxiosError<Error>, Omit<UserType, "password">>(['profile-user-me'], async () => {
      if(!localStorage.getItem('token')) throw new Error('No token');
        const response = await HOME_AXIOS_CLIENT.get(`/home/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if(!response.data) throw new Error('No user');
      return response.data as Omit<UserType, 'password'>;
    }, {
        // enabled: !!token,
        // cacheTime: 6000,
        // refetchOnMount: false,
        // refetchOnWindowFocus: false,
        // refetchOnReconnect: true,
        retry: (failureCount, error) => {
            if(error.status === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                navigate(redirectTo);
                return false;
            }
            return failureCount < 3;
        },
        onError: (error) => {
            console.log('zibi')
            if(error.status === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
            if(redirectIfNotFound)navigate(redirectTo);
        },
        onSuccess: (data) => {
            if(data && redirectIfFound) {
                navigate(redirectTo);
            }
        }
    });

    return { userData: user };
}