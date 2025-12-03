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

    const monthLabels = useMemo(() => {
        const monthsMap = records.reduce((acc, r) => {
            if (!r.date) return acc;
            const dateObj = new Date(r.date);
            if (dateObj.getFullYear() === dashboardYear) {
            acc[dateObj.getMonth() + 1] = true; // 중복 제거용
            }
            return acc;
        }, {});

        return Object.keys(monthsMap)
            .map(Number)
            .sort((a, b) => a - b)
            .map(String);
    }, [records, dashboardYear]);

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

  const getYearSummary = (year) => {
    const y = String(year);
    return {
      income: yearStats[y]?.income || 0,
      expense: yearStats[y]?.expense || 0,
      net: (yearStats[y]?.income || 0) - (yearStats[y]?.expense || 0),
    };
  };

  const monthStats = useMemo(() => {
    const stats = {};
    for (let i = 1; i <= 12; i++) {
      stats[i] = { income: 0, expense: 0 };
    }
    records.forEach(r => {
      if (!r.date) return;
      const dateObj = new Date(r.date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      if (year === dashboardYear) {
        if (r.category === 'INCOME') stats[month].income += Number(r.amount) || 0;
        else stats[month].expense += Number(r.amount) || 0;
      }
    });
    return stats;
  }, [records, dashboardYear]);

  const monthlySummary = useMemo(() => monthLabels.map(m => ({
    month: Number(m),
    income: monthStats[Number(m)]?.income || 0,
    expense: monthStats[Number(m)]?.expense || 0,
    net: (monthStats[Number(m)]?.income || 0) - (monthStats[Number(m)]?.expense || 0),
  })), [monthLabels, monthStats]);

  const totalGraphData = useMemo(() => {
    return {
      labels: monthLabels,
      datasets: [
        {
          label: '수입',
          data: monthLabels.map(y => monthStats[y]?.income || 0),
          backgroundColor: '#3ad29f',
        },
        {
          label: '지출',
          data: monthLabels.map(y => monthStats[y]?.expense || 0),
          backgroundColor: '#5b5fc7',
        },
      ],
    };
  }, [monthLabels, monthStats]);

  return {
    dashboardYear, setDashboardYear, totalGraphData, yearLabels, getYearSummary,
    monthlySummary,
  };
}
