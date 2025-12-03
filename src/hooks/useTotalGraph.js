import { useMemo } from 'react';
import { useAccountBook } from './useAccountBook';

export function useTotalGraph() {
  const { graphView, setGraphView, records } = useAccountBook();

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

  const filteredDayLabels = useMemo(() => {
    if (graphView !== 'day') return dayLabels;
    return dayLabels.filter(d => {
      const date = new Date(d);
      return date.getFullYear() === new Date().getFullYear() && date.getMonth() + 1 === new Date().getMonth() + 1;
    });
  }, [dayLabels, graphView]);

  const filteredMonthLabels = useMemo(() => {
    if (graphView !== 'month') return months;
    return months.filter(m => {
      const [y, mon] = m.split('-');
      return Number(y) === new Date().getFullYear();
    });
  }, [months, graphView]);

  const incomeGraphData = useMemo(() => graphView === 'year' ? {
    labels: yearLabels,
    datasets: [{
      label: '수입',
      data: yearLabels.map(y => yearStats[y]?.income || 0),
      backgroundColor: '#3ad29f',
    }],
  } : graphView === 'month' ? {
    labels: filteredMonthLabels,
    datasets: [{
      label: '수입',
      data: filteredMonthLabels.map(m => monthlyStats[m]?.income || 0),
      backgroundColor: '#3ad29f',
    }],
  } : {
    labels: filteredDayLabels,
    datasets: [{
      label: '수입',
      data: filteredDayLabels.map(d => dayStats[d]?.income || 0),
      backgroundColor: '#3ad29f',
    }],
  }, [graphView, yearLabels, yearStats, filteredMonthLabels, monthlyStats, filteredDayLabels, dayStats]);

  const expenseGraphData = useMemo(() => graphView === 'year' ? {
    labels: yearLabels,
    datasets: [{
      label: '지출',
      data: yearLabels.map(y => yearStats[y]?.expense || 0),
      backgroundColor: '#5b5fc7',
    }],
  } : graphView === 'month' ? {
    labels: filteredMonthLabels,
    datasets: [{
      label: '지출',
      data: filteredMonthLabels.map(m => monthlyStats[m]?.expense || 0),
      backgroundColor: '#5b5fc7',
    }],
  } : {
    labels: filteredDayLabels,
    datasets: [{
      label: '지출',
      data: filteredDayLabels.map(d => dayStats[d]?.expense || 0),
      backgroundColor: '#5b5fc7',
    }],
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
    totalGraphData, incomeGraphData, expenseGraphData, graphView, setGraphView
  };
}
