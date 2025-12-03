import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 1000px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #181c2a;
  color: #e3e6f3;
  font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', 'Nanum Gothic', Arial, sans-serif;
  overflow-x: auto;
`;
export const TopBar = styled.div`
  margin: 0 auto 1rem auto;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
  font-size: 1.2rem;
`;
export const Title = styled.h1`
  flex: 1;
  color: #fff;
  font-size: clamp(1.3rem, 4vw, 2.25rem);
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.02em;
`;
export const NavButton = styled.button`
  min-width: 32px;
  padding: 0 7px;
  background: #23263a;
  border: 1.5px solid #5b5fc7;
  color: #bfc6d1;
  border-radius: 7px;
  font-size: 1.2rem;
  font-weight: 400;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  &:hover { background: #5b5fc7; color: #fff; }
`;
export const SelectBar = styled.div`
  margin: 0 auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
  font-size: 1rem;
`;
export const Select = styled.select`
  min-width: 48px;
  padding: 0.4rem 0.5rem;
  border: 1.5px solid #5b5fc7;
  border-radius: 6px;
  font-size: 1rem;
  color: #e3e6f3;
  background: #23263a;
  font-weight: 400;
`;
export const Label = styled.label`
  font-size: 1rem;
  color: #bfc6d1;
  font-weight: 400;
  margin-right: 0.2rem;
`;
export const Total = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  color: #fff;
  font-weight: 400;
  font-size: clamp(1rem, 2vw, 1.5rem);
  letter-spacing: 0.01em;
  span { color: #5b5fc7; font-size: 1.1em; font-weight: 500; }
  margin-left: auto;
  margin-right: auto;
`;
export const CalendarBox = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
      max-width: 100vw;
      margin: 0 auto 0.3rem auto;
  }
`;
export const MonthSummary = styled.div`
  width: 100%;
  text-align: left;
  font-size: 1.08em;
  font-weight: 400;
  color: #111;
  background: none;
  margin-bottom: 0.7em;
  padding: 0.2em 0.2em 0.2em 0.5em;
  border-radius: 0.3em;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7em;
`;
export const TableWrapper = styled.div`
  margin: 0 auto 1.2em auto;
  overflow-x: auto;
  background: #23263a;
  border-radius: 12px;
  box-shadow: 0 2px 16px 0 #181c2a44;
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #23263a;
  font-size: 1.05em;
  margin: 0 auto;
`;
export const Th = styled.th`
  flex : 1;
  border-bottom: 2px solid #5b5fc7;
  padding: 0.7em 0.3em;
  background: #23263a;
  font-weight: 600;
  text-align : center;
  color: #bfc6d1;
`;
export const Td = styled.td`
  flex : 1;
  border-bottom: 1px solid #23263a;
  padding: 0.7em 0.3em;
  text-align: center;
  font-size: 1em;
  color: #e3e6f3;
`;
export const InputRow = styled.div`
  display: flex;
  flex-wrap : wrap;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  margin: 1.2em 0 0.5em 0;
`;
export const Input = styled.input`
  flex : 1;
  padding: 0.4em 0.5em;
  border: 1.5px solid #5b5fc7;
  border-radius: 6px;
  font-size: 1em;
  min-width: 80px;
  background: #23263a;
  color: #e3e6f3;
`;
export const Button = styled.button`
  background: #5b5fc7;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5em 1.2em;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #3ad29f;
    color: #23263a;
  }
`;
export const TabBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
  margin: 1.2em 0 1.2em 0;
`;
export const TabBtn = styled.button`
  padding: 0.5em 1.3em;
  border: 1.5px solid #5b5fc7;
  border-radius: 7px 7px 0 0;
  background: ${({active})=>active ? '#5b5fc7' : '#23263a'};
  color: ${({active})=>active ? '#fff' : '#bfc6d1'};
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  outline: none;
`;
export const Layout = styled.div`
  display: flex;
  height : 100vh;
  background: #181c2a;
  @media (max-width: 1000px) {
    width: 100vw;
    flex-direction : column;
  }
`;
export const Sidebar = styled.nav`
  width: 240px;
  background: #1a1d2e;
  color: #e3e6f3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 0 2em 0;
  box-shadow: 2px 0 16px 0 #181c2a44;
  position: relative;
  @media (max-width: 1000px) {
    width: 100%;
    height : 200px;
    padding: 0;
    flex-direction: row;
  }
`;
export const SidebarLogo = styled.div`
  font-size: 1.25em;
  font-weight: 700;
  color: #fff;
  padding: 2.2em 1.5em 1.2em 1.5em;
  letter-spacing: 0.03em;
  background: #181c2a;
  text-align: left;
  @media (max-width: 1000px) {
    font-size: 1.25em;
    font-weight: 700;
    padding: 1.2em 1.5em 1.2em 1.5em;
  }
`;
export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  @media (max-width: 1000px) {
    flex-direction: row;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const SidebarItem = styled.li`
  flex : 1;
  margin: 0.2em 0;
`;
export const SidebarLink = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 0.9em;
  background: ${({ $active }) => $active ? '#23263a' : 'none'};
  color: ${({ $active }) => $active ? '#5b5fc7' : '#e3e6f3'};
  border: none;
  outline: none;
  font-size: 1.08em;
  font-weight: 500;
  padding: 0.95em 2em 0.95em 2em;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  border-left: 4px solid ${({ $active }) => $active ? '#5b5fc7' : 'transparent'};
  &:hover {
    background: #23263a;
    color: #5b5fc7;
  }
  @media (max-width: 1000px) {
    padding: 1.2em 1.5em 1.2em 1.5em;
    font-size: 1em;
    border-left: none;
    background: none;
    justify-content: center;
    text-align: center;
  }
`;
export const Main = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: #181c2a;
  padding: 0 0 2em 0;
  @media (max-width: 1000px) {
    padding: 0 0 1em 0;
  }
`;
export const MainContent = styled.div`
  min-width: 60vw;
  max-width: 60vw;
  margin: 0 auto;
  padding: 2.5em 2em 0 2em;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none; 
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 600px) {
    padding: 1.2em 0.2em 0 0.2em;
  }
`;
export const DashboardYearSelectBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  gap: 1em;
  @media (max-width: 600px) {
    gap: 0.5em;
    margin-bottom: 0.7em;
  }
`;
