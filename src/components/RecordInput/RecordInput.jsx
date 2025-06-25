import React from 'react';
import * as S from './styled';

function RecordInput({ newRecord, setNewRecord, handleAddRecord }) {
    return (
        // 입력 폼 전체를 감싸는 박스, 제출 시 handleAddRecord 함수 실행
        <S.InputBox as="form" onSubmit={e => { e.preventDefault(); handleAddRecord(); }}>
            
            {/* 수입/지출 구분 선택 셀렉트 박스 */}
            <S.Select
                name="type"
                value={newRecord.category}
                onChange={e => setNewRecord({ ...newRecord, category: e.target.value })}
            >
                <option value="INCOME">수입</option>
                <option value="EXPENSE">지출</option>
            </S.Select>
            
            {/* 금액 입력란, 숫자만 입력 가능, 최대값 제한 */}
            <S.Input
                name="amount"
                type="number"
                placeholder="금액"
                max={9999999999}
                value={newRecord.amount}
                onChange={e => setNewRecord({ ...newRecord, amount: e.target.value })}
            />
            
            {/* 사유 입력란, 최대 글자수 10자로 제한 */}
            <S.Input
                name="description"
                type="text"
                placeholder="사유"
                maxLength={10}
                value={newRecord.description}
                onChange={e => setNewRecord({ ...newRecord, description: e.target.value })}
            />
            
            {/* 날짜 입력란, 달력에서 날짜 선택 가능 */}
            <S.Input
                name="date"
                type="date"
                value={newRecord.date}
                onChange={e => setNewRecord({ ...newRecord, date: e.target.value })}
            />
            
            {/* 제출 버튼, 클릭 시 폼 제출 */}
            <S.Button type="submit">추가</S.Button>
        </S.InputBox>
    );
}

export default RecordInput;
