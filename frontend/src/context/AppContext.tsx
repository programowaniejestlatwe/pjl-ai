import React, { useReducer, useMemo } from "react";
import PropTypes from "prop-types";

//const AppContext = createContext(null);
type TVehicle = {
  name: string;
  model: string;
  chassis: string;
  fuel: string;
  motor: string;
};

type TThread = {
  id: number;
  title: string;
};

interface IAppContext {
  vehicle?: TVehicle;
  malfunctionDescription: string;
  thread?: TThread;
  partNameId: string;
  postId: string;
}

const initialState: IAppContext = {
  vehicle: undefined,
  malfunctionDescription: "",
  thread: undefined,
  partNameId: "",
  postId: "",
};

enum ActionType {
  SET_VEHICLE = "SET_VEHICLE",
}

interface IReducer {
  type: ActionType;
  value: any;
}

interface IAppController
  extends Array<IAppContext | React.Dispatch<IReducer>> {}

const reducer: React.Reducer<IAppContext, IReducer> = (state, action) => {
  switch (action.type) {
    case ActionType.SET_VEHICLE: {
      return { ...state, miniSidenav: action.value };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const AppContext = React.createContext<IAppController>([
  [initialState, () => {}],
] as any);

const AppControllerProvider = ({ children }: { children: React.ReactNode }) => {
  const [controller, dispatch] = useReducer<
    React.Reducer<IAppContext, IReducer>
  >(reducer, initialState);

  const value = useMemo<[IAppContext, React.Dispatch<IReducer>]>(() => {
    return [controller, dispatch];
  }, [controller, dispatch]);

  const AppContextProvider = AppContext.Provider;
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppControllerProvider };
