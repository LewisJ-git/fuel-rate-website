import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = () => {
  const [user, setUser] = useState({
    name: sessionStorage.getItem("username"),
    auth: sessionStorage.getItem("auth") === "true",
    role: sessionStorage.getItem("role"),
    userID: sessionStorage.getItem("userID"),
  });

  const login = (name, role, userID) => {
    setUser(() => ({
      name: name,
      auth: true,
      role: role,
      userID: userID,
    }));
    sessionStorage.setItem("username", name);
    sessionStorage.setItem("auth", true);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("userID", userID);
  };

  const logout = () => {
    setUser(() => ({
      name: "guest",
      auth: false,
    }));
    sessionStorage.setItem("username", "guest");
    sessionStorage.setItem("auth", false);
    sessionStorage.setItem("role", null);
    sessionStorage.setItem("userID", null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
    </UserContext.Provider>
  );
};