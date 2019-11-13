import { Observable } from 'rxjs';

export type Selector<T, V> = (observable$: Observable<T>) => Observable<V>;
