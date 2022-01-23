import React from 'react';
import { Values, WinSequence } from '../../types';

import './styles.css';

type ButtonFieldArgs = {
  value: Values;
  buttonFieldNumber: number;
  handlePlay: (value: number) => void;
  winSequence: WinSequence | undefined;
};

const ButtonField: React.FC<ButtonFieldArgs> = args => {
  const { value, buttonFieldNumber, handlePlay, winSequence } = args;

  const sequenceIndexes: number[] = [];
  if (winSequence) {
    sequenceIndexes.push(winSequence.position1.index);
    sequenceIndexes.push(winSequence.position2.index);
    sequenceIndexes.push(winSequence.position3.index);
  }

  let style = 'field-button';
  if (value) style += ' filled';
  if (sequenceIndexes.indexOf(buttonFieldNumber) >= 0) style += ' win-sequence';

  return (
    <button
      type="button"
      onClick={() => handlePlay(buttonFieldNumber)}
      className={style}
    >
      {value || buttonFieldNumber}
    </button>
  );
};

export default ButtonField;
