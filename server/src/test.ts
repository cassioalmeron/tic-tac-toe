import readline from 'readline';
import Game from './Game';
import { numberToPosition } from './util';

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const game = new Game();

const validsKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

process.stdin.on('keypress', (str, key) => {
  const { name } = key;

  if (validsKeys.indexOf(key.name) >= 0) {
    const position = numberToPosition(Number(name));

    const result = game.play(position);

    console.log('-------------');
    console.log(result.matrix[0]);
    console.log(result.matrix[1]);
    console.log(result.matrix[2]);

    if (result.finished) {
      console.log('Winner: ', result.winner);
      process.exit();
    }
  }

  if (key.ctrl && key.name === 'c') process.exit();
});
