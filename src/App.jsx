import React from 'react';
import * as S from './styled';
import CalendarTable from './components/calendarTable/CalendarTable';
import ExpenseModal from './components/expenseModal/ExpenseModal';
import useCalendarExpense from './hooks/useCalendarExpense';

// 카테고리 상수
const CATEGORIES = {
  FOOD: '음식',
  TRANSPORT: '교통',
  HOUSING: '주거',
  HEALTH: '건강',
  HOBBY: '취미',
  SAVING: '저축',
  ETC: '기타'
};

function App() {
  // 커스텀 훅으로 모든 상태/로직 관리
  const now = new Date();
  const {
    expenses,
    selectedDate,
    modalOpen,
    modalMode,
    newExpense,
    editIndex,
    editExpense,
    selectedYear,
    selectedMonth,
    yearRange,
    monthRange,
    setSelectedYear,
    setSelectedMonth,
    setNewExpense,
    setEditExpense,
    setModalMode,
    getCalendarMatrix,
    handleDateClick,
    handleExpenseSubmit,
    handleEditExpenseClick,
    handleEditExpenseSubmit,
    handleModalClose,
    calculateMonthlyTotal
  } = useCalendarExpense(now, CATEGORIES);

  // UI 렌더링
  return (
    <S.Wrapper>
      {/* 상단 월/연도 타이틀 및 이동 */}
      <S.TopBar>
        <S.Title>{selectedYear}년 {selectedMonth}월</S.Title>
        <S.NavButton onClick={() => setSelectedYear(selectedMonth === 1 ? selectedYear - 1 : selectedYear) || setSelectedMonth(selectedMonth === 1 ? 12 : selectedMonth - 1)}>&lt;</S.NavButton>
        <S.NavButton onClick={() => setSelectedYear(selectedMonth === 12 ? selectedYear + 1 : selectedYear) || setSelectedMonth(selectedMonth === 12 ? 1 : selectedMonth + 1)}>&gt;</S.NavButton>
      </S.TopBar>
      {/* 연도/월 선택 */}
      <S.SelectBar>
        <S.Label htmlFor="year">연도</S.Label>
        <S.Select id="year" value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))}>
          {yearRange.map(year => (
            <option key={year} value={year}>{year}년</option>
          ))}
        </S.Select>
        <S.Label htmlFor="month">월</S.Label>
        <S.Select id="month" value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))}>
          {monthRange.map(month => (
            <option key={month} value={month}>{month}월</option>
          ))}
        </S.Select>
      </S.SelectBar>
      {/* 월 총 지출 */}
      <S.Total>
        {selectedYear}년 {selectedMonth}월 총 지출: <span>￦{calculateMonthlyTotal()}</span>
      </S.Total>
      {/* 달력 테이블 - 반응형 */}
      <S.CalendarBox>
        <CalendarTable
          days={getCalendarMatrix()}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          expenses={expenses}
          CATEGORIES={CATEGORIES}
          onDateClick={handleDateClick}
        />
      </S.CalendarBox>
      {/* 지출 모달 */}
      <ExpenseModal
        open={modalOpen}
        mode={modalMode}
        selectedDate={selectedDate}
        newExpense={newExpense}
        setNewExpense={setNewExpense}
        editExpense={editExpense}
        setEditExpense={setEditExpense}
        onClose={handleModalClose}
        onSubmit={handleExpenseSubmit}
        onEditSubmit={handleEditExpenseSubmit}
        onAddClick={() => setModalMode('add')}
        onEditClick={handleEditExpenseClick}
        expenses={expenses}
        CATEGORIES={CATEGORIES}
        editIndex={editIndex}
        setModalMode={setModalMode}
      />
    </S.Wrapper>
  );
}

export default App;
