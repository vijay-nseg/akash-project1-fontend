import React, { createContext, useState } from "react";

const AlertContext = createContext({
  state: {
    open: false,
    content: null,
    title: "",
    handleSubmit: () => {},
  },
  updateState: () => {},
});

export const AlertProvider = ({ children }) => {
  const [currentState, setCurrentState] = useState({
    open: false,
    content: null,
    title: "",
    handleSubmit: () => {},
  });

   const handleUpdateAlert = (title, onSubmit) => {
    const newState = {
      open: !currentState.open,
      handleSubmit: onSubmit,
      title: title,
    };
    setCurrentState(newState);
  };


  return (
    <AlertContext.Provider
      value={{
        state: currentState,
        updateState: handleUpdateAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
