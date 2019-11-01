import { Action } from '@ngrx/store';

export const GET_STATISTICS = '[Dashboard] Get Statistics';
export const GET_STATISTICS_SUCCESS = '[Dashboard] Get Statistics Success';

export class GetStatistics implements Action {
  readonly type = GET_STATISTICS;
}

export class GetStatisticsSuccess implements Action {
  readonly type = GET_STATISTICS_SUCCESS;
  constructor(public payload: any) { }
}

export type All = GetStatistics | GetStatisticsSuccess;
