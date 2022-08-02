import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";

export const AuthContext = createContext();
/*AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);*/
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
 

  const register = (email, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/auth/signup/`, {
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo)); //buscar esta cosa
        setIsLoading(false);
        console.log(userInfo);
        alert("Usuario exitosamente registrado. Ve a Login.");
      })
      .catch((e) => {
        console.log(`register error ${e}`);

        setIsLoading(false);
        alert(e);
      });
  };

  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/auth/login/`, {
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data; //porqué hay que ponerle el let?
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        //console.log(userInfo.tokens.access);
      })
      .catch((e) => {
        //un error es cualquier cosa que no sea un 400?
        console.log(`login error ${e}`);

        setIsLoading(false);
        alert(e);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }
      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const logout = () => {
    setUserInfo({});
    setIsLoading(false);
  };


  const requestPassword = (email, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/auth/request-reset-email/`, {
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo)); //buscar esta cosa
        setIsLoading(false);
        console.log(userInfo);
        alert("Revisa tu correo. Proporciona nueva contraseña{}.");
      })
      .catch((e) => {
        console.log(`register error ${e}`);

        setIsLoading(false);
        alert(e);
      });
  };

  const resetPassword = (email, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/auth/password-reset-complete/`, {
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo)); //buscar esta cosa
        setIsLoading(false);
        console.log(userInfo);
        alert("Tu contraseña se ha modificado. Ve a Login.");
      })
      .catch((e) => {
        console.log(`register error ${e}`);

        setIsLoading(false);
        alert(e);
      });
  };

//  }

 return (
    <AuthContext.Provider
      value={{ register, userInfo, login, splashLoading, isLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
);
};

/*
export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (name, email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/register`, {
        name,
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/login`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.access_token}`},
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
*/
