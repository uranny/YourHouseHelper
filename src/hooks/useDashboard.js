import { useMemo } from 'react';
import { useAccountBook } from './useAccountBook';

export function useDashboard() {
  const {
    dashboardYear, setDashboardYear, records
  } = useAccountBook();

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

  const yearlySummary = useMemo(() => yearLabels.map(y => ({
    year: Number(y),
    income: yearStats[y]?.income || 0,
    expense: yearStats[y]?.expense || 0,
    net: (yearStats[y]?.income || 0) - (yearStats[y]?.expense || 0),
  })), [yearLabels, yearStats]);

  const getYearSummary = (year) => {
    const y = String(year);
    return {
      income: yearStats[y]?.income || 0,
      expense: yearStats[y]?.expense || 0,
      net: (yearStats[y]?.income || 0) - (yearStats[y]?.expense || 0),
    };
  };

  const totalGraphData = useMemo(() => {
    return {
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
    };
  }, [yearLabels, yearStats]);

  const CATEGORIES = {
    INCOME: '수입',
    EXPENSE: '지출',
  };

  return {
    dashboardYear, setDashboardYear, yearLabels,
    getYearSummary, yearlySummary, totalGraphData, records, CATEGORIES
  };
}
