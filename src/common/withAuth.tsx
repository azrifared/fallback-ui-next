import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

function withAuth(Component: React.FunctionComponent<any>) {
  function AuthenticatedComponent(props: any) {
      const router = useRouter();
      const [user, setUser] = useState<string>()

      useEffect(() => {
        const userLdap = Cookies.get('user-ldap')
        if (!userLdap) router.push('/login')
        setUser(userLdap)
      }, []);

      return !!user ? <Component {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
