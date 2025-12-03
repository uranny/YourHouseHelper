import styled from 'styled-components';

export const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    background: #23263a;
    border-radius: 10px;
    box-shadow: none;
`;

export const Table = styled.table`
    width: 100%;
    display : flex;
    flex-direction : column;
    border-collapse: collapse;
    background: transparent;
`;

export const Th = styled.th`
    flex : 1;
    background: #23263a;
    color: #fff;
    font-weight: 600;
    padding: 0.7em 0.5em;
    border-bottom: 1.5px solid #5b5fc7;
    font-size: 1em;
`;

export const Td = styled.td`
    flex : 1;
    color: #fff;
    padding: 0.7em 0.5em;
    text-align: center;
    font-size: 1em;
    border-bottom: 1px solid #23263a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const Tr = styled.tr`
    display : flex;
    flex : 1;
    &:nth-child(even) {
        background: #23263a;
    }
`;
