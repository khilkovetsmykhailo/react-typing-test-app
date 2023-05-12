import { createContext, PropsWithChildren, useState } from "react";

type IUserContext = {
  username: string;
  setUsername: (value: string) => void;
};

export const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState("");

  return <UserContext.Provider value={{ username, setUsername }}>{children}</UserContext.Provider>;
};

export default UserProvider;
