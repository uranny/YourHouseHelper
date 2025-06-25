import React from 'react';
import * as S from './styled'; // 스타일드 컴포넌트를 불러옴

// DashboardSummary 컴포넌트는 연도별 수입, 지출, 순이익(합계)를 보여주는 박스 UI 컴포넌트
function DashboardSummary({ year, income, expense, net }) {
  return (
    <S.SummaryBox> {/* 전체 요약 박스를 감싸는 컨테이너 */}
      
      {/* 총 수입 섹션 */}
      <div>
        <S.SummaryTitle>{year}년 총 수입</S.SummaryTitle>
        <S.SummaryValue color="#3ad29f">
          {income.toLocaleString()}원 {/* 수입 값에 천 단위 콤마 추가 후 출력 */}
        </S.SummaryValue>
      </div>

      {/* 총 지출 섹션 */}
      <div>
        <S.SummaryTitle>{year}년 총 지출</S.SummaryTitle>
        <S.SummaryValue color="#5b5fc7">
          {expense.toLocaleString()}원 {/* 지출 값 출력 */}
        </S.SummaryValue>
      </div>

      {/* 합계 (순이익) 섹션 */}
      <div>
        <S.SummaryTitle>{year}년 합계</S.SummaryTitle>
        <S.SummaryValue color={net >= 0 ? '#3ad29f' : '#e74c3c'}>
          {net.toLocaleString()}원 {/* 순이익이 양수면 초록, 음수면 빨간색으로 표시 */}
        </S.SummaryValue>
      </div>
      
    </S.SummaryBox>
  );
}

export default DashboardSummary; // 외부에서 이 컴포넌트를 사용할 수 있도록 export
