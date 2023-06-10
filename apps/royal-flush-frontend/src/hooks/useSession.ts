import { UserType } from "@royal/shared";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_AXIOS_CLIENT } from "../app/app";

type UseSessionOptions = {
    redirectTo: string;
    redirectIfFound?: boolean;
};
type IUseSession = {
    userData?: Omit<UserType, 'password'>;
};

export default function useSession({
    redirectTo,
    redirectIfFound,
}: UseSessionOptions = {redirectTo: '/login', redirectIfFound: false}): IUseSession {
    const navigate = useNavigate();
    const { data:user, } = useQuery(['profile-user-me'], async () => {
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
    });
        
    return { userData: user };
}