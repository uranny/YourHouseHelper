import styled from 'styled-components';

export const InputBox = styled.form`
    display: flex;
    align-items: center;
    gap: 0.6em;
    border-radius: 10px;
    margin-bottom: 1.2em;
    box-shadow: none;
`;

export const Input = styled.input`
    background: #23263a;
    border: 1.5px solid #5b5fc7;
    border-radius: 6px;
    color: #fff;
    padding: 0.4em 0.5em;
    font-size: 1em;
    font-weight: 400;
`;

export const Select = styled.select`
    padding: 0.4rem 0.5rem;
    border: 1.5px solid #5b5fc7;
    border-radius: 6px;
    font-size: 1rem;
    color: #fff;
    background: #23263a;
    font-weight: 400;
`;

export const Button = styled.button`
    background: #5b5fc7;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.4em 0.97em;
    font-size: 1em;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: #3ad29f;
        color: #fff;
    }
`;
