export enum AppState {
  CLOSED = 'CLOSED',
  OPENING = 'OPENING',
  OPEN = 'OPEN',
  NEXT_PAGE = 'NEXT_PAGE'
}

export interface GridConfig {
  speed: number;
  color: string;
  lineThickness: number;
  spacing: number;
}
