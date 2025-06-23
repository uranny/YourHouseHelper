import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, getDay, addDays, subMonths } from 'date-fns';

// 가계부 달력 관련 상태와 로직을 관리하는 커스텀 훅
export default function useCalendarExpense(now, CATEGORIES) {
  // 상태 정의
    const [expenses, setExpenses] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('view');
    const [newExpense, setNewExpense] = useState({ amount: '', category: 'FOOD', description: '' });
    const [editIndex, setEditIndex] = useState(null);
    const [editExpense, setEditExpense] = useState(null);
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);

  // 연도/월 옵션
    const yearRange = Array.from({length: 11}, (_, i) => now.getFullYear() - 5 + i);
    const monthRange = Array.from({length: 12}, (_, i) => i + 1);

  // 로컬스토리지에서 불러오기
    useEffect(() => {
        const savedExpenses = localStorage.getItem('expenses');
        if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    }, []);   
  // 로컬스토리지에 저장
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

  // 달력 셀 데이터 생성 (앞/뒤 달 포함, 밀림 현상 방지)
    const getCalendarMatrix = () => {
        const start = startOfMonth(new Date(selectedYear, selectedMonth - 1));
        const end = endOfMonth(new Date(selectedYear, selectedMonth - 1));
        const startWeekDay = getDay(start);
        const daysInMonth = end.getDate();
        // 앞달 채우기 (밀림 현상 방지: 0이면 빈 배열)
        const prevMonth = subMonths(start, 1);
        const prevMonthEnd = endOfMonth(prevMonth);
        const prevMonthDays = startWeekDay === 0 ? [] : Array.from({length: startWeekDay}, (_, i) => addDays(prevMonthEnd, i - startWeekDay + 1));
        const thisMonthDays = Array.from({length: daysInMonth}, (_, i) => addDays(start, i));
        const totalCells = prevMonthDays.length + thisMonthDays.length;
        const nextMonthDays = Array.from({length: (7 - (totalCells % 7)) % 7}, (_, i) => addDays(end, i + 1));
        return [...prevMonthDays, ...thisMonthDays, ...nextMonthDays];
    };

  // 날짜 클릭 핸들러
    const handleDateClick = (date) => {
        const dateKey = format(date, 'yyyy-MM-dd');
        const dayExpenses = expenses[dateKey] || [];
        setSelectedDate(date);
        if (dayExpenses.length === 0) setModalMode('add');
        else setModalMode('view');
        setModalOpen(true);
    };

  // 지출 추가
    const handleExpenseSubmit = () => {
        if (!selectedDate || !newExpense.amount) return;
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        setExpenses({
        ...expenses,
        [dateKey]: [...(expenses[dateKey] || []), newExpense]
        });
        setModalOpen(false);
        setNewExpense({ amount: '', category: 'FOOD', description: '' });
    };

  // 지출 수정 모드 진입
    const handleEditExpenseClick = (idx) => {
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        setEditIndex(idx);
        setEditExpense({ ...expenses[dateKey][idx] });
        setModalMode('edit');
    };

  // 지출 수정 저장
    const handleEditExpenseSubmit = () => {
        if (!selectedDate || editIndex === null || !editExpense.amount) return;
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        const updatedDay = [...expenses[dateKey]];
        updatedDay[editIndex] = editExpense;
        setExpenses({ ...expenses, [dateKey]: updatedDay });
        setEditIndex(null);
        setEditExpense(null);
        setModalMode('view');
    };

  // 모달 닫기
    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedDate(null);
        setNewExpense({ amount: '', category: 'FOOD', description: '' });
        setEditIndex(null);
        setEditExpense(null);
        setModalMode('view');
    };

    // 월 총 지출 계산
    const calculateMonthlyTotal = () => {
        const start = startOfMonth(new Date(selectedYear, selectedMonth - 1));
        const end = endOfMonth(new Date(selectedYear, selectedMonth - 1));
        let total = 0;
        Object.entries(expenses).forEach(([date, dayExpenses]) => {
        const expenseDate = new Date(date);
        if (expenseDate >= start && expenseDate <= end) {
            dayExpenses.forEach(expense => {
            total += Number(expense.amount);
            });
        }
        });
        return total.toLocaleString();
    };

    return {
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
    };
}
