import api from "../config/api.config";

interface ICredentials {
  username: string;
  password: string;
  email: string;
}

interface SignInData {
  id: number;
  name: string;
}

export const signIn = (credentials: ICredentials): Promise<SignInData> => {
  return new Promise((resolve, reject) => {
    api
      .post("/user/signin", credentials)
      .then(({ data }) => {
        const id = data.id;
        const name = data.name;
        resolve({ id: id, name: name });
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};
