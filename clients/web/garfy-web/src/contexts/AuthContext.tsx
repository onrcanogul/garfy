import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import Keycloak, { KeycloakInstance } from "keycloak-js";
import {
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
  KEYCLOAK_URL,
} from "../constants/keycloak";
import axios from "axios";
import ToastrService from "../services/toastr-service";

const keycloak: KeycloakInstance = new Keycloak({
  url: "http://localhost:8070",
  realm: "master",
  clientId: "react-client",
});

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  getToken: () => Promise<string | null>;
  getCurrentUser: () => Promise<{
    userId: string | undefined;
    username: string | undefined;
  } | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const isInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;
    const storedToken = localStorage.getItem("kc-token");
    const storedRefreshToken = localStorage.getItem("kc-refresh-token");

    keycloak
      .init({
        onLoad: storedToken ? "check-sso" : "login-required", // Eğer token varsa SSO kontrolü yap
        token: storedToken || undefined,
        refreshToken: storedRefreshToken || undefined,
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);

        if (authenticated) {
          localStorage.setItem("kc-token", keycloak.token || "");
          localStorage.setItem("kc-refresh-token", keycloak.refreshToken || "");
          ToastrService.success("Giriş işlemi başarılı.");
          startTokenRefresh(); // Token yenileme mekanizmasını başlat
        } else {
          ToastrService.error("Giriş işlemi sırasında bir sorun oluştu.");
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  const startTokenRefresh = () => {
    setInterval(() => {
      keycloak
        .updateToken(30)
        .then((refreshed) => {
          if (refreshed) {
            localStorage.setItem("kc-token", keycloak.token || "");
            localStorage.setItem(
              "kc-refresh-token",
              keycloak.refreshToken || ""
            );
          }
        })
        .catch(() => {
          console.error(
            "Token yenileme başarısız! Kullanıcı oturumu sonlandırılabilir."
          );
          keycloak.logout();
        });
    }, 60000);
  };

  const login = async () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout();
    setIsAuthenticated(false);
    localStorage.removeItem("kc-token");
    localStorage.removeItem("kc-refresh-token");
  };

  const getCurrentUser = async (): Promise<{
    userId: string | undefined;
    username: string | undefined;
  } | null> => {
    if (!keycloak.tokenParsed) return null;
    return {
      userId: keycloak.tokenParsed.sub,
      username: keycloak.tokenParsed.preferred_username,
    };
  };

  const getToken = async (): Promise<string | null> => {
    if (keycloak.token) {
      try {
        await keycloak.updateToken(30);
        localStorage.setItem("kc-token", keycloak.token);
        return keycloak.token;
      } catch (error) {
        console.error("Token yenileme hatası:", error);
        return null;
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, getToken, getCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth hook'u AuthProvider içinde kullanılmalıdır!");
  }
  return context;
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
