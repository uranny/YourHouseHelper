import React from 'react';
import * as S from './styled';

function RecordInput({ newRecord, setNewRecord, handleAddRecord }) {
    return (
        <S.InputBox as="form" onSubmit={e => { e.preventDefault(); handleAddRecord(); }}>
            <S.Select
                name="type"
                value={newRecord.category}
                onChange={e => setNewRecord({ ...newRecord, category: e.target.value })}
            >
                <option value="INCOME">수입</option>
                <option value="EXPENSE">지출</option>
            </S.Select>
            <S.Input
                name="amount"
                type="number"
                placeholder="금액"
                max={9999999999}
                value={newRecord.amount}
                onChange={e => setNewRecord({ ...newRecord, amount: e.target.value })}
            />
            <S.Input
                name="description"
                type="text"
                placeholder="사유"
                maxLength={10}
                value={newRecord.description}
                onChange={e => setNewRecord({ ...newRecord, description: e.target.value })}
            />
            <S.Input
                name="date"
                type="date"
                value={newRecord.date}
                onChange={e => setNewRecord({ ...newRecord, date: e.target.value })}
            />
            <S.Button type="submit">추가</S.Button>
        </S.InputBox>
    );
}

export default RecordInput;
