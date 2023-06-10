import { UserType } from "@royal/shared";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_AXIOS_CLIENT } from "../app/app";
import { AxiosError } from "axios";

type UseSessionOptions = {
    redirectTo: string;
    redirectIfFound: boolean;
    redirectIfNotFound: boolean;
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
    const { data:user, isFetched} = useQuery<Omit<UserType, "password">, AxiosError<Error>, Omit<UserType, "password">>(['profile-user-me'], async () => {
      const response = await HOME_AXIOS_CLIENT.get(`/home/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if(response.status === 401) {
        localStorage.removeItem('token');
        navigate(redirectTo);
      }
      return response.data as Omit<UserType, 'password'>;
    }, {
        cacheTime: 6000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: (failureCount, error) => {
            if(error.status === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                navigate(redirectTo);
                return false;
            }
            return failureCount < 3;
        },
    });
        
    useEffect(() => {
        if(isFetched && !user && redirectIfNotFound) {
            navigate(redirectTo);
        }
        if(isFetched && user && redirectIfFound) {
            navigate(redirectTo);
        }
    }, [isFetched, user, redirectIfFound, redirectIfNotFound,redirectTo, navigate]);

    return { userData: user };
}