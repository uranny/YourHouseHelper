import styled from 'styled-components';

export const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
`;
export const Table = styled.table`
    width: 100%;
    min-width: 340px;
    border-collapse: collapse;
    table-layout: fixed;
`;
export const Th = styled.th`
    color: #1976d2;
    font-weight: 700;
    font-size: 14px;
    height: 32px;
    background: #e3f0fd;
    border-bottom: 1px solid #bbdefb;
    padding: 0;
`;
export const Td = styled.td`
    vertical-align: top;
    background: ${({ today, current }) => today ? '#1976d2' : current ? '#fff' : '#f0f4f8'};
    color: ${({ today, current }) => today ? '#fff' : current ? '#222' : '#bbb'};
    border: 1px solid #e3f0fd;
    width: 14.2%;
    min-width: 44px;
    height: 60px;
    max-width: 80px;
    cursor: pointer;
    border-radius: 6px;
    padding: 2px;
    text-align: left;
    font-size: 13px;
    transition: background 0.15s;
    &:hover { background: ${({ today }) => today ? '#1565c0' : '#e3f0fd'}; }
`;
export const DayNum = styled.div`
    font-weight: ${({ today }) => today ? 700 : 500};
    color: ${({ today, current, col }) => today ? '#fff' : current ? (col === 0 || col === 6 ? '#1976d2' : '#222') : '#bbb'};
    background: ${({ today }) => today ? '#1976d2' : 'transparent'};
    border-radius: ${({ today }) => today ? '50%' : 0};
    padding: ${({ today }) => today ? '2px 7px' : 0};
    font-size: 13px;
    margin-bottom: 2px;
    display: inline-block;
`;
export const ExpenseBox = styled.div`
    width: 100%;
    max-height: 90px;
    min-height: 12px;
    overflow-y: auto;
`;
export const ExpenseItem = styled.div`
    font-size: 11px;
    color: ${({ today }) => today ? '#fff' : '#1976d2'};
    background: ${({ today }) => today ? '#1565c0' : '#e3f0fd'};
    border-radius: 3px;
    margin-bottom: 1px;
    padding: 0 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    font-weight: 600;
`;
