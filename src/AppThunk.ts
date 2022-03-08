import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { Dependency } from "./common/DependencyContainer";
import { RootState } from "./store";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, Dependency, AnyAction>