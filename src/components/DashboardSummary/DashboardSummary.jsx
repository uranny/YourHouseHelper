import React from 'react';
import * as S from './styled';

function DashboardSummary({ year = '0000', income = 0, expense = 0, net = 0 }) {
  const safeIncome = Number(income) || 0;
  const safeExpense = Number(expense) || 0;
  const safeNet = Number(net) || 0;

  return (
    <S.SummaryBox> 
      <div>
        <S.SummaryTitle>{year}년 총 수입</S.SummaryTitle>
        <S.SummaryValue color="#3ad29f">{safeIncome.toLocaleString()}원</S.SummaryValue>
      </div>
      <div>
        <S.SummaryTitle>{year}년 총 지출</S.SummaryTitle>
        <S.SummaryValue color="#5b5fc7">{safeExpense.toLocaleString()}원</S.SummaryValue>
      </div>
      <div>
        <S.SummaryTitle>{year}년 합계</S.SummaryTitle>
        <S.SummaryValue color={safeNet >= 0 ? '#3ad29f' : '#e74c3c'}>
          {safeNet.toLocaleString()}원
        </S.SummaryValue>
      </div>
    </S.SummaryBox>
  );
}

export default DashboardSummary;
