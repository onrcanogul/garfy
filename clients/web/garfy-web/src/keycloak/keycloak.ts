import Keycloak from "keycloak-js";
import ToastrService from "../services/toastr-service";

const keycloak = new Keycloak({
  url: "http://localhost:8070",
  realm: "master",
  clientId: "react-client",
});

const initKeycloak = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then((authenticated) => {
        if (authenticated) {
          ToastrService.success("Giriş Başarılı.");
        } else {
          ToastrService.error("Giriş Başarısız.");
        }
        resolve(authenticated);
      })
      .catch((error) => {
        console.error("Keycloak başlatma hatası:", error);
        reject(error);
      });
  });
};

const login = (): void => {
  keycloak.login();
};

const logout = (): void => {
  keycloak.logout();
};

const getToken = async (): Promise<string | null> => {
  if (keycloak.token) {
    try {
      await keycloak.updateToken(30);
      return keycloak.token;
    } catch (error) {
      console.error("Token güncelleme hatası:", error);
      return null;
    }
  }
  return null;
};

export { keycloak, initKeycloak, login, logout, getToken };
