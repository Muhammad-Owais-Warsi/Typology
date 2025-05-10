import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect, useState } from "react";
import db from "../utils/supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const { getAccessToken } = useKindeAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const res = await fetch(
          `https://chimptype.kinde.com/oauth2/v2/user_profile`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await res.json();
        const findUser = await db.getUser(data.email);

        // console.log(findUser.success[0].id);

        if (findUser.success.length === 0) {
          const newUser = await db.createUser(data.email);

          if (newUser.success) {
            console.log(newUser.success);
            setUser({
              id: newUser.success,
            });
          }
        } else {
          console.log(findUser);

          if (findUser.success) {
            setUser({
              id: findUser.success[0].id,
            });
          }
        }
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    };

    fetchData();
  }, [getAccessToken]);

  return {
    user,
    error,
  };
}
