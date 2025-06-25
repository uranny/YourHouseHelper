import React from 'react';
import { Bar } from 'react-chartjs-2';
import * as S from './styled';

function YearlyGraph({ data }) {
    return (
        <S.GraphBox> {/* 그래프 전체 컨테이너 */}
            <S.GraphTitle>연도별 수입/지출 그래프</S.GraphTitle> {/* 그래프 제목 */}
            <S.ChartBox> {/* 차트 영역 박스 */}
                <Bar
                    data={data} // 차트에 표시할 데이터
                    options={{
                        plugins: { legend: { display: true } }, // 범례 표시 설정
                        responsive: true, // 반응형 차트
                        maintainAspectRatio: false, // 부모 컨테이너 크기에 맞춤
                        scales: { y: { beginAtZero: true } } // y축 0부터 시작
                    }}
                    height={260} // 차트 높이 지정
                />
            </S.ChartBox>
        </S.GraphBox>
    );
}

export default YearlyGraph;
