import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext()

export const NotificationContextProvider = ({children}) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={{notification, notificationDispatch}}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const { notification, notificationDispatch } = useContext(NotificationContext);
  
  const setNotification = (message, seconds = 5) => {
    notificationDispatch({ type: "SHOW", payload: message });
    setTimeout(() => notificationDispatch({ type: "CLEAR" }), seconds * 1000);
  };

  return { notification, setNotification };
};