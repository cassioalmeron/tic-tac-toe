import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
`;

export const ContainerGame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-grow: 1;

  > div {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
`;
