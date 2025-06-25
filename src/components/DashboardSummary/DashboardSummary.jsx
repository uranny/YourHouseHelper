import React from 'react';
import * as S from './styled';

// DashboardSummary 컴포넌트는 연도별 수입, 지출, 그리고 순이익(합계)를 보여주는 UI입니다.
// 전달받은 값이 없거나 잘못된 타입일 때를 대비해 기본값과 안전한 변환을 적용합니다.
function DashboardSummary({ year = '0000', income = 0, expense = 0, net = 0 }) {
  // 혹시 문자열이나 다른 타입으로 들어와도 숫자로 안전하게 변환 (NaN이면 0으로 대체)
  const safeIncome = Number(income) || 0;
  const safeExpense = Number(expense) || 0;
  const safeNet = Number(net) || 0;

  return (
    <S.SummaryBox> {/* 전체 요약 박스를 감싸는 컨테이너 */}
      
      {/* 총 수입 표시 */}
      <div>
        <S.SummaryTitle>{year}년 총 수입</S.SummaryTitle>
        {/* 천 단위 콤마 찍어서 금액 표시, 초록색 텍스트 */}
        <S.SummaryValue color="#3ad29f">{safeIncome.toLocaleString()}원</S.SummaryValue>
      </div>

      {/* 총 지출 표시 */}
      <div>
        <S.SummaryTitle>{year}년 총 지출</S.SummaryTitle>
        {/* 파란색 텍스트 */}
        <S.SummaryValue color="#5b5fc7">{safeExpense.toLocaleString()}원</S.SummaryValue>
      </div>

      {/* 합계 (순이익) 표시 */}
      <div>
        <S.SummaryTitle>{year}년 합계</S.SummaryTitle>
        {/* 순이익이 0 이상이면 초록, 음수면 빨간색으로 표시 */}
        <S.SummaryValue color={safeNet >= 0 ? '#3ad29f' : '#e74c3c'}>
          {safeNet.toLocaleString()}원
        </S.SummaryValue>
      </div>

    </S.SummaryBox>
  );
}

export default DashboardSummary; // 다른 곳에서 사용 가능하도록 내보내기
