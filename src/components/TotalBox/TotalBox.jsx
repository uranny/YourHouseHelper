import React from 'react';
import * as S from './styled';

function TotalBox({ totalIncome, totalExpense, totalNet }) {
    return (
        <S.Total> {/* 전체 합계 박스 컨테이너 */}
            
            {/* 총 수입 표시, 초록색으로 강조 */}
            <span style={{ fontSize: '0.9em', fontWeight: 700, paddingTop: '0.5em', paddingBottom: '0.5em' }}>
                수입 : <S.TotalValue style={{ color: '#3ad29f', fontWeight: 700 }}>
                    {totalIncome.toLocaleString()}원
                </S.TotalValue>
            </span>

            {/* 총 지출 표시, 파란색으로 강조 */}
            <span style={{ fontSize: '0.9em', fontWeight: 700, paddingTop: '0.5em', paddingBottom: '0.5em' }}>
                지출 : <S.TotalValue style={{ color: '#5b5fc7', fontWeight: 700 }}>
                    {totalExpense.toLocaleString()}원
                </S.TotalValue>
            </span>

            {/* 총 합계 표시, 합계가 양수면 초록색, 음수면 빨간색으로 강조 */}
            <span style={{ fontSize: '0.9em', fontWeight: 700, paddingTop: '0.5em', paddingBottom: '0.5em' }}>
                합계 : <S.TotalValue style={{ color: totalNet >= 0 ? '#3ad29f' : '#e74c3c', fontWeight: 700 }}>
                    {totalNet.toLocaleString()}원
                </S.TotalValue>
            </span>

        </S.Total>
    );
}

export default TotalBox;
