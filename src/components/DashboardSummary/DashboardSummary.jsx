import React from 'react';
import * as S from './styled';

function DashboardSummary({ year, income, expense, net }) {
  return (
    <S.SummaryBox>
      <div>
        <S.SummaryTitle>{year}년 총 수입</S.SummaryTitle>
        <S.SummaryValue color="#3ad29f">{income.toLocaleString()}원</S.SummaryValue>
      </div>
      <div>
        <S.SummaryTitle>{year}년 총 지출</S.SummaryTitle>
        <S.SummaryValue color="#5b5fc7">{expense.toLocaleString()}원</S.SummaryValue>
      </div>
      <div>
        <S.SummaryTitle>{year}년 순이익</S.SummaryTitle>
        <S.SummaryValue color={net >= 0 ? '#3ad29f' : '#e74c3c'}>{net.toLocaleString()}원</S.SummaryValue>
      </div>
    </S.SummaryBox>
  );
}

export default DashboardSummary;
