import React from 'react';
import * as S from './styled'; // styled-components로 작성된 스타일 요소 불러오기

function DashboardTable({ records, CATEGORIES }) {
  return (
    <S.TableWrapper> {/* 표를 감싸는 외부 wrapper, 스크롤 등 스타일링용 */}
      <S.Table> {/* 실제 표 컴포넌트 */}
        <thead>
          <tr>
            <S.Th>날짜</S.Th>
            <S.Th>구분</S.Th>
            <S.Th>금액</S.Th>
            <S.Th>사유</S.Th>
          </tr>
        </thead>
        <tbody>
          {/* records가 비어 있을 경우: 안내 메시지 출력 */}
          {records.length === 0 ? (
            <tr>
              <S.Td colSpan={4} style={{ textAlign: 'center', color: '#aaa' }}>
                내역이 없습니다.
              </S.Td>
            </tr>
          ) : (
            // records가 있을 경우: map으로 각 기록을 한 줄씩 출력
            records.map((r, i) => (
              <S.Tr key={i}>
                <S.Td>{r.date}</S.Td> {/* 날짜 */}
                <S.Td>{CATEGORIES[r.category]}</S.Td> {/* 'INCOME' → '수입' 같은 텍스트로 변환 */}
                <S.Td
                  style={{
                    color: r.category === 'INCOME' ? '#3ad29f' : '#5b5fc7', // 수입이면 초록, 지출이면 파랑
                    fontWeight: 500
                  }}
                >
                  {Number(r.amount).toLocaleString()}원 {/* 금액 출력 (콤마 포함) */}
                </S.Td>
                <S.Td>{r.description}</S.Td> {/* 사용자가 입력한 메모/사유 */}
              </S.Tr>
            ))
          )}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
}

export default DashboardTable; // 외부에서 이 컴포넌트를 import하여 사용할 수 있도록 export
