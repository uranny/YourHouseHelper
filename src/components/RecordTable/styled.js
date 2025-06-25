import styled from 'styled-components';

// RecordTable 스타일 설정
export const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    background: #23263a;
    border-radius: 10px;
    margin-bottom: 1.2em;
    box-shadow: none;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: transparent;
`;

export const Th = styled.th`
    background: #23263a;
    color: #fff;
    font-weight: 600;
    padding: 0.7em 0.5em;
    border-bottom: 1.5px solid #5b5fc7;
    font-size: 1em;
`;

export const Td = styled.td`
    color: #fff;
    padding: 0.7em 0.5em;
    text-align: center;
    font-size: 1em;
    border-bottom: 1px solid #23263a;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const Tr = styled.tr`
    &:nth-child(even) {
        background: #23263a;
    }
`;
