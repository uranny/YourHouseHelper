import React from 'react';
import { format, isSameMonth, isToday } from 'date-fns';
import * as S from './styled';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

function CalendarTable({ days, selectedYear, selectedMonth, expenses, CATEGORIES, onDateClick }) {
  // 7일씩 행으로 분할
  const rows = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }
  return (
    <S.TableWrapper>
      <S.Table>
        <thead>
          <tr>
            {weekDays.map((w) => (
              <S.Th key={w}>{w}</S.Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((week, rowIdx) => (
            <tr key={rowIdx}>
              {week.map((day, colIdx) => {
                const dateKey = format(day, 'yyyy-MM-dd');
                const dayExpenses = expenses[dateKey] || [];
                const isCurrentMonth = isSameMonth(day, new Date(selectedYear, selectedMonth - 1));
                const today = isToday(day);
                return (
                  <S.Td
                    key={dateKey}
                    today={today}
                    current={isCurrentMonth}
                    onClick={() => onDateClick(day)}
                  >
                    <S.DayNum today={today} current={isCurrentMonth} col={colIdx}>
                      {format(day, 'd')}
                    </S.DayNum>
                    <S.ExpenseBox>
                      {dayExpenses.map((expense, idx) => {
                        const amountStr = `￦${Number(expense.amount).toLocaleString()}`;
                        const maxLen = 8;
                        const displayAmount = amountStr.length > maxLen ? amountStr.slice(0, maxLen) + '...' : amountStr;
                        return (
                          <S.ExpenseItem key={idx} today={today}>
                            <span>{CATEGORIES[expense.category]}</span> {displayAmount}
                          </S.ExpenseItem>
                        );
                      })}
                    </S.ExpenseBox>
                  </S.Td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
}

export default CalendarTable;
