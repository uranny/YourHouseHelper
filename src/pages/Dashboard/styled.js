import styled from 'styled-components';

export const DashboardPageWrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top : 2em;
  gap: 2em;
`;

export const DashboardYearSelectBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 1.5em;
`;

export const Select = styled.select`
  background: #23263a;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5em 1em;
  font-size: 1em;
`;

export const Button = styled.button`
  background: #5b5fc7;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.7em 1.5em;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
`;
