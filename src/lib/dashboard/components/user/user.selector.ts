import { Selector } from '../../type/selector';
import { IAppState } from '../../type/app-state';
import { UserState } from './user.model';

import { map, distinctUntilChanged } from 'rxjs/operators';

export function getUserList(): Selector<IAppState, UserState> {
  return state$ => state$.pipe(
    map(state => state.user.get('users')),
    distinctUntilChanged()
  )
}