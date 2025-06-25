import React from 'react';
import * as S from '../../styled';

function TopBar({ selectedYear, selectedMonth, setSelectedYear, setSelectedMonth, yearRange, monthRange }) {
    return (
        <S.TopBar> {/* 상단 바 전체 컨테이너 */}

            {/* 현재 선택된 연도와 월을 표시하는 제목 */}
            <S.Title>{selectedYear}년 {selectedMonth}월 가계부</S.Title>

            {/* 연도, 월 선택과 네비게이션 버튼을 세로로 정렬하는 컨테이너 */}
            <div style={{display:'flex', alignItems:'flex-end', flexDirection:'column', gap:'0.5em'}}>

                {/* 연도 및 월 선택 셀렉트 박스 컨테이너 */}
                <S.SelectBar>
                    {/* 연도 선택 셀렉트 박스 */}
                    <S.Select 
                        id="year" 
                        value={selectedYear} 
                        onChange={e => setSelectedYear(Number(e.target.value))}
                    >
                        {/* yearRange 배열을 순회하며 옵션 생성 */}
                        {yearRange.map(year => (
                            <option key={year} value={year}>{year}년</option>
                        ))}
                    </S.Select>

                    {/* 월 선택 셀렉트 박스 */}
                    <S.Select 
                        id="month" 
                        value={selectedMonth} 
                        onChange={e => setSelectedMonth(Number(e.target.value))}
                    >
                        {/* monthRange 배열을 순회하며 옵션 생성 */}
                        {monthRange.map(month => (
                            <option key={month} value={month}>{month}월</option>
                        ))}
                    </S.Select>
                </S.SelectBar>

                {/* 이전달, 다음달 이동 버튼 컨테이너 */}
                <div style={{display:'flex', gap:'0.5em'}}>
                    {/* 이전 버튼: 1월에서 12월로 연도 변경 처리 */}
                    <S.NavButton 
                        onClick={() => {
                            // 만약 현재 월이 1월이면 연도를 1년 감소, 그렇지 않으면 그대로
                            setSelectedYear(selectedMonth === 1 ? selectedYear - 1 : selectedYear);
                            // 월은 1월이면 12월로, 아니면 이전 달로 변경
                            setSelectedMonth(selectedMonth === 1 ? 12 : selectedMonth - 1);
                        }}
                    >
                        {"<"}
                    </S.NavButton>

                    {/* 다음 버튼: 12월에서 1월로 연도 변경 처리 */}
                    <S.NavButton 
                        onClick={() => {
                            // 만약 현재 월이 12월이면 연도를 1년 증가, 그렇지 않으면 그대로
                            setSelectedYear(selectedMonth === 12 ? selectedYear + 1 : selectedYear);
                            // 월은 12월이면 1월로, 아니면 다음 달로 변경
                            setSelectedMonth(selectedMonth === 12 ? 1 : selectedMonth + 1);
                        }}
                    >
                        {">"}
                    </S.NavButton>
                </div>
            </div>
        </S.TopBar>
    );
}

export default TopBar;
