import React from 'react';
import { Bar } from 'react-chartjs-2';
import * as S from './styled';

function YearlyGraph({ data }) {
    return (
        <S.GraphBox>
            <S.GraphTitle>연도별 수입/지출 그래프</S.GraphTitle> 
            <S.ChartBox>
                <Bar
                    data={data}
                    options={{
                        plugins: { legend: { display: true } },
                        responsive: true, 
                        maintainAspectRatio: false, 
                        scales: { y: { beginAtZero: true } } 
                    }}
                    height={260} 
                />
            </S.ChartBox>
        </S.GraphBox>
    );
}

export default YearlyGraph;
