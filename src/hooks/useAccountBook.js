import { useMemo, useState } from 'react';

export function useAccountBook(records, selectedYear, selectedMonth, graphView) {
  // 월별 내역 필터링
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const d = new Date(r.date);
      return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth;
    });
  }, [records, selectedYear, selectedMonth]);

  // 월별 합계
  const { totalIncome, totalExpense, totalNet } = useMemo(() => {
    let totalIncome = 0, totalExpense = 0;
    filteredRecords.forEach(r => {
      if (r.category === 'INCOME') totalIncome += Number(r.amount) || 0;
      else totalExpense += Number(r.amount) || 0;
    });
    return { totalIncome, totalExpense, totalNet: totalIncome - totalExpense };
  }, [filteredRecords]);

  // 월별 집계 (그래프용)
  const monthlyStats = useMemo(() => {
    const stats = {};
    records.forEach(r => {
      if (!r.date) return;
      const ym = r.date.slice(0, 7);
      if (!stats[ym]) stats[ym] = { income: 0, expense: 0 };
      if (r.category === 'INCOME') stats[ym].income += Number(r.amount) || 0;
      else stats[ym].expense += Number(r.amount) || 0;
    });
    return stats;
  }, [records]);
  const months = Object.keys(monthlyStats).sort();

  // 연/월별 그래프 데이터 생성
  const yearLabels = useMemo(() => {
    const years = {};
    records.forEach(r => {
      if (!r.date) return;
      const y = r.date.slice(0, 4);
      if (!years[y]) years[y] = { income: 0, expense: 0 };
      if (r.category === 'INCOME') years[y].income += Number(r.amount) || 0;
      else years[y].expense += Number(r.amount) || 0;
    });
    return Object.keys(years).sort();
  }, [records]);
  const yearStats = useMemo(() => {
    const stats = {};
    records.forEach(r => {
      if (!r.date) return;
      const y = r.date.slice(0, 4);
      if (!stats[y]) stats[y] = { income: 0, expense: 0 };
      if (r.category === 'INCOME') stats[y].income += Number(r.amount) || 0;
      else stats[y].expense += Number(r.amount) || 0;
    });
    return stats;
  }, [records]);

  // 일별 집계
  const dayLabels = useMemo(() => {
    const days = {};
    records.forEach(r => {
      if (!r.date) return;
      const d = r.date;
      if (!days[d]) days[d] = { income: 0, expense: 0 };
      if (r.category === 'INCOME') days[d].income += Number(r.amount) || 0;
      else days[d].expense += Number(r.amount) || 0;
    });
    return Object.keys(days).sort();
  }, [records]);
  const dayStats = useMemo(() => {
    const stats = {};
    records.forEach(r => {
      if (!r.date) return;
      const d = r.date;
      if (!stats[d]) stats[d] = { income: 0, expense: 0 };
      if (r.category === 'INCOME') stats[d].income += Number(r.amount) || 0;
      else stats[d].expense += Number(r.amount) || 0;
    });
    return stats;
  }, [records]);

  // 그래프 단위별 데이터에서 현재 선택된 연/월에 해당하는 데이터만 필터링 (일별/월별)
  const filteredDayLabels = useMemo(() => {
    if (graphView !== 'day') return dayLabels;
    return dayLabels.filter(d => {
      const date = new Date(d);
      return date.getFullYear() === selectedYear && date.getMonth() + 1 === selectedMonth;
    });
  }, [dayLabels, graphView, selectedYear, selectedMonth]);
  const filteredMonthLabels = useMemo(() => {
    if (graphView !== 'month') return months;
    return months.filter(m => {
      const [y, mon] = m.split('-');
      return Number(y) === selectedYear;
    });
  }, [months, graphView, selectedYear]);

  // 그래프 데이터 (필터 적용)
  const incomeGraphData = useMemo(() => graphView === 'year' ? {
    labels: yearLabels,
    datasets: [
      {
        label: '수입',
        data: yearLabels.map(y => yearStats[y]?.income || 0),
        backgroundColor: '#3ad29f',
      },
    ],
  } : graphView === 'month' ? {
    labels: filteredMonthLabels,
    datasets: [
      {
        label: '수입',
        data: filteredMonthLabels.map(m => monthlyStats[m]?.income || 0),
        backgroundColor: '#3ad29f',
      },
    ],
  } : {
    labels: filteredDayLabels,
    datasets: [
      {
        label: '수입',
        data: filteredDayLabels.map(d => dayStats[d]?.income || 0),
        backgroundColor: '#3ad29f',
      },
    ],
  }, [graphView, yearLabels, yearStats, filteredMonthLabels, monthlyStats, filteredDayLabels, dayStats]);

  const expenseGraphData = useMemo(() => graphView === 'year' ? {
    labels: yearLabels,
    datasets: [
      {
        label: '지출',
        data: yearLabels.map(y => yearStats[y]?.expense || 0),
        backgroundColor: '#5b5fc7',
      },
    ],
  } : graphView === 'month' ? {
    labels: filteredMonthLabels,
    datasets: [
      {
        label: '지출',
        data: filteredMonthLabels.map(m => monthlyStats[m]?.expense || 0),
        backgroundColor: '#5b5fc7',
      },
    ],
  } : {
    labels: filteredDayLabels,
    datasets: [
      {
        label: '지출',
        data: filteredDayLabels.map(d => dayStats[d]?.expense || 0),
        backgroundColor: '#5b5fc7',
      },
    ],
  }, [graphView, yearLabels, yearStats, filteredMonthLabels, monthlyStats, filteredDayLabels, dayStats]);

  const totalGraphData = useMemo(() => graphView === 'year' ? {
    labels: yearLabels,
    datasets: [
      {
        label: '수입',
        data: yearLabels.map(y => yearStats[y]?.income || 0),
        backgroundColor: '#3ad29f',
      },
      {
        label: '지출',
        data: yearLabels.map(y => yearStats[y]?.expense || 0),
        backgroundColor: '#5b5fc7',
      },
    ],
  } : graphView === 'month' ? {
    labels: filteredMonthLabels,
    datasets: [
      {
        label: '수입',
        data: filteredMonthLabels.map(m => monthlyStats[m]?.income || 0),
        backgroundColor: '#3ad29f',
      },
      {
        label: '지출',
        data: filteredMonthLabels.map(m => monthlyStats[m]?.expense || 0),
        backgroundColor: '#5b5fc7',
      },
    ],
  } : {
    labels: filteredDayLabels,
    datasets: [
      {
        label: '수입',
        data: filteredDayLabels.map(d => dayStats[d]?.income || 0),
        backgroundColor: '#3ad29f',
      },
      {
        label: '지출',
        data: filteredDayLabels.map(d => dayStats[d]?.expense || 0),
        backgroundColor: '#5b5fc7',
      },
    ],
  }, [graphView, yearLabels, yearStats, filteredMonthLabels, monthlyStats, filteredDayLabels, dayStats]);

  return {
    filteredRecords,
    totalIncome,
    totalExpense,
    totalNet,
    incomeGraphData,
    expenseGraphData,
    totalGraphData,
  };
}
