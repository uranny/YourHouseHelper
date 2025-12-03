import styled from 'styled-components';

export const GraphBoxWrapper = styled.div`
    background: #23263a;
    border-radius: 10px;
    padding: 1.5em 1.5em 1.5em 1.5em;
    margin-bottom: 1.2em;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ChartTitle = styled.div`
    color: #fff;
    font-size: 1.1em;
    font-weight: 600;
`;

export const ChartBox = styled.div`
    width: 100%;
    max-width: 600px;
    min-height: 260px;
    background: transparent;
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
        color: #fff;
    }
`;
