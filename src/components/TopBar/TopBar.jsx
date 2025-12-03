import React from 'react';
import * as S from '../../styled';

function TopBar({ selectedYear, selectedMonth, setSelectedYear, setSelectedMonth, yearRange, monthRange }) {
    return (
        <S.TopBar>
            <S.Title>{selectedYear}년 {selectedMonth}월 가계부</S.Title>
            <div style={{display:'flex', alignItems:'flex-end', flexDirection:'column', gap:'0.5em'}}>
                <S.SelectBar>
                    <S.Select 
                        id="year" 
                        value={selectedYear} 
                        onChange={e => setSelectedYear(Number(e.target.value))}
                    >
                        {yearRange.map(year => (
                            <option key={year} value={year}>{year}년</option>
                        ))}
                    </S.Select>
                    <S.Select 
                        id="month" 
                        value={selectedMonth} 
                        onChange={e => setSelectedMonth(Number(e.target.value))}
                    >
                        {monthRange.map(month => (
                            <option key={month} value={month}>{month}월</option>
                        ))}
                    </S.Select>
                </S.SelectBar>
                <div style={{display:'flex', gap:'0.5em'}}>
                    <S.NavButton 
                        onClick={() => {
                            setSelectedYear(selectedMonth === 1 ? selectedYear - 1 : selectedYear);
                            setSelectedMonth(selectedMonth === 1 ? 12 : selectedMonth - 1);
                        }}
                    >
                        {"<"}
                    </S.NavButton>
                    <S.NavButton 
                        onClick={() => {
                            setSelectedYear(selectedMonth === 12 ? selectedYear + 1 : selectedYear);
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
