import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 1.5rem 0.5rem;
    background: #f5faff;
    min-height: 100vh;
    box-sizing: border-box;
`;
export const TopBar = styled.div`
    max-width: 700px;
    margin: 0 auto 1rem auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
`;
export const Title = styled.h1`
    flex: 1;
    color: #1976d2;
    font-size: clamp(1.3rem, 4vw, 2.2rem);
    font-weight: 700;
    margin: 0;
`;
export const NavButton = styled.button`
    min-width: 36px;
    padding: 0 8px;
    background: #fff;
    border: 1.5px solid #1976d2;
    color: #1976d2;
    border-radius: 6px;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s;
    &:hover { background: #e3f0fd; }
`;
export const SelectBar = styled.div`
    max-width: 700px;
    margin: 0 auto 1rem auto;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
`;
export const Select = styled.select`
    min-width: 60px;
    padding: 0.3rem 0.7rem;
    border: 1.5px solid #1976d2;
    border-radius: 6px;
    font-size: 1rem;
    color: #1976d2;
    background: #fff;
    font-weight: 600;
`;
export const Label = styled.label`
    font-size: 0.95rem;
    color: #1976d2;
    font-weight: 600;
    margin-right: 0.3rem;
`;
export const Total = styled.div`
    text-align: center;
    margin-bottom: 1rem;
    color: #1976d2;
    font-weight: 600;
    font-size: clamp(1rem, 2vw, 1.2rem);
    span { color: #0d47a1; }
`;
export const CalendarBox = styled.div`
    width: 100%;
    max-width: 700px;
    margin: 0 auto 1.5rem auto;
`;
