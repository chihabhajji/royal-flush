import { useState } from "react";

type UseSessionOptions = {
    redirectTo?: string;
    redirectIfFound?: boolean;
};
export default function useSession({
    redirectTo,
    redirectIfFound,
}: UseSessionOptions = {'redirectTo': '/', 'redirectIfFound': false}) {
    const [userData, setUserData] = useState<any>(null);
}