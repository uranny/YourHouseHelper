import styled from 'styled-components';

// TopBar 스타일 설정
export const TopBar = styled.div`
    margin: 0 auto 1rem auto;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    flex-wrap: wrap;
    font-size: 1.2rem;
    color: #fff;
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
    color: #fff;
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
    color: #fff;
`;
export const Select = styled.select`
    min-width: 48px;
    padding: 0.4rem 0.5rem;
    border: 1.5px solid #5b5fc7;
    border-radius: 6px;
    font-size: 1rem;
    color: #fff;
    background: #23263a;
    font-weight: 400;
`;
