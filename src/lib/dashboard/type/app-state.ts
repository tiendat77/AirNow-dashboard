import { DashboardState } from '../store/dashboard.state';
import { UserState } from '../components/user/user.model';

export interface IAppState {
    dashboard: DashboardState;
    user: UserState;
}
