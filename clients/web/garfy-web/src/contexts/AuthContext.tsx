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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const isInitialized = useRef<boolean>(false); // Bir kere çalıştırmayı sağlamak için useRef ekliyoruz

  useEffect(() => {
    if (isInitialized.current) return; // Eğer zaten init çalıştıysa tekrar başlatma
    isInitialized.current = true;

    console.log("🔍 Keycloak başlatılıyor...");
    keycloak
      .init({
        onLoad: "login-required",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        if (authenticated) {
          localStorage.setItem("kc-token", keycloak.token || "");
          localStorage.setItem("kc-refresh-token", keycloak.refreshToken || "");
          startTokenRefresh();
        }
      })
      .catch((err) => {
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

  const login = () => {
    console.log("🔑 Kullanıcı giriş yapıyor...");
    keycloak.login();
  };

  const logout = () => {
    console.log("🚪 Kullanıcı çıkış yapıyor...");
    keycloak.logout();
    setIsAuthenticated(false);
    localStorage.removeItem("kc-token");
    localStorage.removeItem("kc-refresh-token");
  };

  const getToken = async (): Promise<string | null> => {
    console.log("🔄 Token alınıyor...");
    if (keycloak.token) {
      try {
        await keycloak.updateToken(30);
        console.log("✅ Güncellenmiş Token:", keycloak.token);
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
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
