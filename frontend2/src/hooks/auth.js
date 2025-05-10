import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useEffect, useState } from "react";

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

        setUser({
          name: data.name,
          email: data.email,
          avatar: data.picture
        })
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    };

    fetchData();
  }, [getAccessToken]);
  
  
  return {
    user,
    error
  }
}
