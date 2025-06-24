import styled from "styled-components";

export const Overlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.45);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const ModalBox = styled.div`
    background: #23263a;
    border-radius: 12px;
    padding: 2.2em 2em 1.5em 2em;
    min-width: 320px;
    max-width: 95vw;
    box-shadow: 0 4px 32px 0 #0008;
    color: #fff;
`;
export const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
    margin-bottom: 1.2em;
`;
export const Label = styled.label`
    min-width: 60px;
    font-size: 1.08em;
`;
export const Input = styled.input`
    background: #181a28;
    border: 1px solid #5b5fc7;
    border-radius: 6px;
    color: #fff;
    padding: 0.5em 0.8em;
    font-size: 1em;
    outline: none;
`;
export const Select = styled.select`
    background: #181a28;
    border: 1px solid #5b5fc7;
    border-radius: 6px;
    color: #fff;
    padding: 0.5em 0.8em;
    font-size: 1em;
`;
export const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1em;
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
