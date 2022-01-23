/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Players } from '../../types';

import './styles.css';

type ScoreArgs = {
  players: Players;
};

const Score: React.FC<ScoreArgs> = args => {
  const { players } = args;

  return (
    <div className="score">
      {players.player2 && (
        <>
          <span className="score-name score-name1">{players.player1.name}</span>
          <div>
            <span className="score-number">{players.player1.score}</span>
            <span className="score-number">X</span>
            <span className="score-number">{players.player2.score}</span>
          </div>
          <span className="score-name score-name2">{players.player2.name}</span>
        </>
      )}
    </div>
  );
};

export default Score;
