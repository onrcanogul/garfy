import axios from "axios";

const KEYCLOAK_URL = "http://localhost:8070";
const REALM = "garfyrealm";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
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
          Authorization: `Bearer ADMIN_ACCESS_TOKEN`, // Burada Admin Token gerekli
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Kullanıcı kaydedilirken hata oluştu:", error);
    return null;
  }
};

export const currentUser = () => {
  return {
    id: "89e12f97-22b3-4ee5-839f-28f72ccb2507",
    username: "oogul",
  };
};
