import React, { createContext, useContext, useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import axios from "axios";
import {
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
  KEYCLOAK_URL,
} from "../constants/keycloak";

const keycloak = new Keycloak({
  url: "http://localhost:8070",
  realm: "garfyrealm",
  clientId: "react-client",
});

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
      })
      .then((authenticated) => {
        setIsAuthenticated(false);
        console.log(authenticated);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout();
    setIsAuthenticated(false);
  };

  const getToken = async (): Promise<string | null> => {
    if (keycloak.token) {
      try {
        await keycloak.updateToken(30);
        return keycloak.token;
      } catch (error) {
        console.error("Token yenileme hatası:", error);
        return null;
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const getAdminToken = async () => {
  try {
    const response = await axios.post(
      `${KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`,
      new URLSearchParams({
        client_id: "react-client",
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
        grant_type: "password",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Admin token alınamadı:", error);
    return null;
  }
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth hook'u AuthProvider içinde kullanılmalıdır!");
  }
  return context;
};
