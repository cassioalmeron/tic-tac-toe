/* eslint-disable import/prefer-default-export */
import { Position } from './types';

export function numberToPosition(value: number): Position {
  let position: Position = { x: 0, y: 0 };

  if (value === 1) position = { x: 2, y: 0 };
  else if (value === 2) position = { x: 2, y: 1 };
  else if (value === 3) position = { x: 2, y: 2 };
  else if (value === 4) position = { x: 1, y: 0 };
  else if (value === 5) position = { x: 1, y: 1 };
  else if (value === 6) position = { x: 1, y: 2 };
  else if (value === 7) position = { x: 0, y: 0 };
  else if (value === 8) position = { x: 0, y: 1 };
  else if (value === 9) position = { x: 0, y: 2 };

  return position;
}
