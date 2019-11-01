import * as DashboardActions from './dashboard.action';
import { DashboardState } from './dashboard.state';

type DashboardActions = DashboardActions.All;

const initialState: DashboardState = {
  statistics: [],
};

export function dashboardReducer(state: DashboardState = initialState, action: DashboardActions.All) {

  switch (action.type) {

    case DashboardActions.GET_STATISTICS: {
      return {
        ...state
      };
    }

    case DashboardActions.GET_STATISTICS_SUCCESS: {
      const statistics = action.payload;
      return {
        ...state,
        statistics
      };
    }

    default:
      return state;
  }
}
