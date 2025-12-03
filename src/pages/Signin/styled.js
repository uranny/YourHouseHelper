import styled from "styled-components"

export const Layout = styled.div`
    margin: 0 auto;
    max-width: 900px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top : 2em;
    gap : 1em;
    border-radius: 12px;
`;
export const InputRow = styled.div`
    display: flex;
    align-items: center;
    margin : 0 12rem 0 12rem;
`;
export const Label = styled.label`
    color: #bfc6d1;
    font-size: 1.1em;
    min-width: 120px;
    font-weight: 500;
`;
export const Input = styled.input`
    flex: 1;
    padding: 0.7em 1em;
    border: 1.5px solid #5b5fc7;
    border-radius: 6px;
    font-size: 1em;
    background: #181c2a;
    color: #e3e6f3;
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
    margin : 0 12rem 0 12rem;
    &:disabled { background: #444; color: #bbb; };
`;
export const TextBtn = styled.button`
    background: none;
    color: #3ad29f;
    border: none;
    font-size: 1em;
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline;
    margin-top : 1rem;
    margin-bottom : 2rem
`;