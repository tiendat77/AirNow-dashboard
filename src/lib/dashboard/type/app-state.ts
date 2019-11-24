import { DashboardState } from '../components/dashboard/dashboard.state';
import { UserState } from '../components/user/user.model';
import { DeviceState } from '../components/device/device.model';

export interface IAppState {
    dashboard: DashboardState;
    user: UserState;
    device: DeviceState;
}
