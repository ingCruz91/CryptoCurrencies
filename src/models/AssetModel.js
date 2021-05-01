export type ASSET_STATUS_TYPE = 'DOWN' | 'UP';

export const ASSET_STATUS = {
  DOWN: 'DOWN',
  UP: 'UP',
};

export type ASSET_TYPE = {
  id: number,
  key: string,
  value: string,
  diff: any,
  status: ASSET_STATUS_TYPE,
};
