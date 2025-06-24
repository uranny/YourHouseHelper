import styled from 'styled-components';

// TotalBox 스타일 설정
export const Total = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.2em;
    border: 1.5px solid #5b5fc7;
    border-radius: 10px;
    background: #23263a;
    font-size: 1.13em;
    font-weight: 400;
    padding: 0.7em 0.5em;
    margin-top: 1em;
    margin-bottom : 1em;
    box-shadow: none;
    letter-spacing: 0.01em;
    color: #fff;
    span { min-width: 80px; color: #fff; }
    @media (max-width: 1000px) {
        flex-direction: column;
        gap: 0.5em;
    }
`;

export const TotalValue = styled.span`
    display: inline-block;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    @media (max-width: 600px) {
        max-width: 120px;
    }
    @media (max-width: 400px) {
        max-width: 90px;
    }
`;
