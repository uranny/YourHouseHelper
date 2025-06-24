import React from 'react';
import * as S from './styled';
import { Bar } from 'react-chartjs-2';

function GraphBox({
    title, color, data, graphView, setGraphView, legend = false
}) {
    return (
        <S.GraphBoxWrapper>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',marginBottom:'0.7em'}}>
                <S.ChartTitle style={{color}}>{title}</S.ChartTitle>
                <div>
                    <S.Button style={{marginRight:'0.5em',background:graphView==='day'?undefined:'#23263a',color:graphView==='day'?'#fff':'#bfc6d1'}} onClick={()=>setGraphView('day')}>일별</S.Button>
                    <S.Button style={{marginRight:'0.5em',background:graphView==='month'?undefined:'#23263a',color:graphView==='month'?'#fff':'#bfc6d1'}} onClick={()=>setGraphView('month')}>월별</S.Button>
                    <S.Button style={{background:graphView==='year'?undefined:'#23263a',color:graphView==='year'?'#fff':'#bfc6d1'}} onClick={()=>setGraphView('year')}>연도별</S.Button>
                </div>
            </div>
            <S.ChartBox style={{height:320}}>
                <Bar
                key={title + graphView} 
                data={data} 
                options={{
                plugins: { legend: { display: legend } },
                scales: { y: { beginAtZero: true } },
                responsive: true,
                maintainAspectRatio: false,
                }} height={320} />
            </S.ChartBox>
        </S.GraphBoxWrapper>
    );
}

export default GraphBox;
