import React from 'react';
import * as S from './styled';
import { Bar } from 'react-chartjs-2';

function GraphBox({
    title, color, data, graphView, setGraphView, legend = false
}) {
    return (
        <S.GraphBoxWrapper> {/* 그래프 전체 박스 감싸는 컨테이너 */}

            {/* 제목과 그래프 뷰 선택 버튼들을 가로 배치하는 영역 */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',marginBottom:'0.7em'}}>
                
                {/* 그래프 제목, color로 텍스트 색상 지정 */}
                <S.ChartTitle style={{color}}>{title}</S.ChartTitle>

                {/* 그래프 뷰 변경 버튼 그룹 */}
                <div style={{justifyContent:'flex-end',display:'flex',alignItems:'center'}}>
                    
                    {/* 일별 버튼, 선택된 뷰는 배경색과 글자색 다르게 표시 */}
                    <S.Button 
                        style={{
                            marginRight:'0.5em',
                            background:graphView==='day'?undefined:'#23263a',
                            color:graphView==='day'?'#fff':'#bfc6d1'
                        }} 
                        onClick={()=>setGraphView('day')}
                    >
                        일별
                    </S.Button>

                    {/* 월별 버튼 */}
                    <S.Button 
                        style={{
                            marginRight:'0.5em',
                            background:graphView==='month'?undefined:'#23263a',
                            color:graphView==='month'?'#fff':'#bfc6d1'
                        }} 
                        onClick={()=>setGraphView('month')}
                    >
                        월별
                    </S.Button>

                    {/* 연도별 버튼 */}
                    <S.Button 
                        style={{
                            background:graphView==='year'?undefined:'#23263a',
                            color:graphView==='year'?'#fff':'#bfc6d1'
                        }} 
                        onClick={()=>setGraphView('year')}
                    >
                        연도별
                    </S.Button>
                </div>
            </div>

            {/* 차트 영역 높이 지정된 박스 */}
            <S.ChartBox style={{height:320}}>
                {/* 막대 그래프 컴포넌트 (react-chartjs-2) */}
                <Bar
                    key={title + graphView} // 그래프 제목과 뷰 조합으로 키 지정 (리렌더링 시 필요)
                    data={data} // 그래프 데이터
                    options={{
                        plugins: { legend: { display: legend } }, // 범례 표시 여부
                        scales: { y: { beginAtZero: true } }, // y축 0부터 시작
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                    height={320}
                />
            </S.ChartBox>
        </S.GraphBoxWrapper>
    );
}

export default GraphBox;
