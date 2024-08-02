import React, { createContext, useEffect, useReducer } from "react";
import axiosClient from "services/axios";

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  return true;
};

const setSession = (accessToken) => {
  if (accessToken && isValidToken(accessToken)) {
    localStorage.setItem("accessToken", accessToken);
    axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axiosClient.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      console.log("init " + isAuthenticated);

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      console.log("login ");
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      console.log("logout ");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      console.log("asdasd");
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    // const response = await axiosClient.post(
    //     'login',
    //     {
    //         email: email,
    //         password: password
    //     },
    //     {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    // );
    console.log("Invalid Email Passowrd");
    if (email != "admin@gmail.com" || password != "jwellery@987") {
      return 1;
    }
    const { token, data } = { token: 1, data: 1 };
    console.log(token, data);
    setSession(token);

    dispatch({
      type: "LOGIN",
      payload: {
        data,
      },
    });
  };

  const logout = () => {
    console.log("logout set session call");
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        console.log("accessToken " + accessToken);
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          try {
            // const response = await axiosClient.get("/user");
            const user = 1;
            console.log(user);
            dispatch({
              type: "INIT",
              payload: {
                isAuthenticated: true,
                user,
              },
            });
          } catch (error) {
            // alert('error 1');
            logout();
          }
        } else {
          // alert('error 2');
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
          logout();
        }
      } catch (err) {
        // alert('error 3');
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
