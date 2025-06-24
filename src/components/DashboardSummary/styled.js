import styled from 'styled-components';

export const SummaryBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #23263a;
  border-radius: 12px;
  padding: 2em 1em;
  margin-bottom: 1em;
  gap: 2em;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1em;
    padding: 1.2em 0.5em;
    border-radius: 7px;
  }
  @media (max-width: 400px) {
    border-radius: 4px;
    padding: 0.7em 0.2em;
  }
`;

export const SummaryTitle = styled.div`
  color: #fff;
  font-size: 0,9em;
  font-weight: 500;
  margin-bottom: 0.5em;
  @media (max-width: 600px) {
    font-size: 0.98em;
  }
  @media (max-width: 400px) {
    font-size: 0.93em;
  }
`;

export const SummaryValue = styled.div`
  color: ${props => props.color || '#fff'};
  font-size: 1.2em;
  font-weight: 700;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 600px) {
    font-size: 1.5em;
    max-width: 120px;
  }
  @media (max-width: 400px) {
    font-size: 1.2em;
    max-width: 90px;
  }
`;
