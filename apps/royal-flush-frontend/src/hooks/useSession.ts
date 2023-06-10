import { UserType } from "@royal/shared";
import { useState } from "react";

type UseSessionOptions = {
    redirectTo?: string;
    redirectIfFound?: boolean;
};
type IUseSession = {
    userData?: Omit<UserType, 'password'>;
};

export default function useSession({
    redirectTo,
    redirectIfFound,
}: UseSessionOptions = {'redirectTo': '/', 'redirectIfFound': false}): IUseSession {
    const [userData, setUserData] = useState<Omit<UserType, 'password'> | undefined>();
    
    return { userData };
}