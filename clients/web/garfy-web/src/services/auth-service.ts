import axios from "axios";
import { getAdminToken } from "../contexts/AuthContext";

const KEYCLOAK_URL = "http://localhost:8070";
const REALM = "garfyrealm";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const adminToken = await getAdminToken();
  if (!adminToken) {
    console.error("Admin token alınamadı, işlem durduruldu.");
    return null;
  }

  try {
    const response = await axios.post(
      `${KEYCLOAK_URL}/admin/realms/${REALM}/users`,
      {
        username,
        email,
        enabled: true,
        credentials: [
          {
            type: "password",
            value: password,
            temporary: false,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Kullanıcı kaydı başarılı:", response.data);
    return response.data;
  } catch (error) {
    console.error("Kullanıcı kayıt hatası:", error);
    return null;
  }
};

export const currentUser = () => {
  return {
    id: "89e12f97-22b3-4ee5-839f-28f72ccb2507",
    username: "oogul",
  };
};
