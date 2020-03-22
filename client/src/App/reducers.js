import { Constants } from "./constants";
import { notificationConstants } from '../components/Notiification/constants'
import {loginConstants} from "../views/Auth/constants";

const initialState = {
  isLoading: false,
  path: "",
  notifications: [],
  regFlag: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.SHOW_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case Constants.CLOSE_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case notificationConstants.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };

    case notificationConstants.CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map(notification => (
            (action.dismissAll || notification.key === action.key)
                ? { ...notification, dismissed: true }
                : { ...notification }
        )),
      };

    case notificationConstants.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
            notification => notification.key !== action.key,
        ),
      };
    case Constants.OPEN_REG_DIALOG:
      return {
        ...state,
        regFlag: true,
      };
    case Constants.CLOSE_REG_DIALOG:
      return {
        ...state,
        regFlag: false,
      };
    case loginConstants.LOGOUT:
      state = initialState;
      return {
        ...state
      };
    default:
      return state;
  }
};

export default appReducer;
