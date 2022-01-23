/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-one-expression-per-line */
import { useCallback, useState } from 'react';
import Room from '../../components/Room';
import api from '../../services/api';
import './styles.css';

type ResultDto = {
  playerId: number;
};

export default function Home() {
  const [playerId, setPlayerId] = useState<number | undefined>();
  const [name, setName] = useState<string>('');

  const handleJoinRoom = useCallback(async () => {
    const requestResult = await api.post('room/join', { name });
    setPlayerId((requestResult.data as ResultDto).playerId);
  }, [name]);

  return (
    <div className="App-header">
      {!playerId && (
        <>
          <input
            type="text"
            id="name"
            placeholder="Digite seu nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button type="button" onClick={handleJoinRoom}>
            Entrar na sala
          </button>
        </>
      )}

      {playerId && <Room playerId={playerId} />}
    </div>
  );
}
