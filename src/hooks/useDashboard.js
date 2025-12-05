import { useMemo } from 'react';
import { useAccountBook } from './useAccountBook';
import { useQuery } from '@tanstack/react-query';
import { recordApi } from '../api/record';
import { QUERY_KEYS } from '../constants/query';

export function useDashboard() {
  const {
    dashboardYear, setDashboardYear,
    dashboardMonth, setDashboardMonth
  } = useAccountBook();

  // 이번 연도 1~12월 기록 조회
  const { data: yearRecords = [], isLoading: yearLoading } = useQuery({
    queryKey: [QUERY_KEYS.RECORDS, dashboardYear],
    queryFn: async () => {
      const startDate = `${dashboardYear}-01-01`;
      const endDate = `${dashboardYear}-12-31`;
      const res = await recordApi.list({ startDate, endDate });
      return res.data.data || [];
    },
  });

  // 이번 달 기록 조회
  const { data: monthRecords = [], isLoading: monthLoading } = useQuery({
    queryKey: [QUERY_KEYS.RECORDS, dashboardYear, dashboardMonth],
    queryFn: async () => {
      const lastDay = String(new Date(dashboardYear, dashboardMonth, 0).getDate()).padStart(2, '0');
      const startDate = `${dashboardYear}-${String(dashboardMonth).padStart(2, '0')}-01`;
      const endDate = `${dashboardYear}-${String(dashboardMonth).padStart(2, '0')}-${lastDay}`;
      const res = await recordApi.list({ startDate, endDate });
      return res.data.data || [];
    },
  });

  // 월별 통계
  const monthLabels = Array.from({ length: 12 }, (_, i) => String(i + 1));
  
  const monthStats = useMemo(() => {
    const stats = {};
    for (let i = 1; i <= 12; i++) {
      stats[i] = { income: 0, expense: 0 };
    }
    yearRecords.forEach(r => {
      const dateObj = new Date(r.date);
      const month = dateObj.getMonth() + 1;
      if (r.recordType === 'INCOME') stats[month].income += Number(r.cost) || 0;
      else stats[month].expense += Number(r.cost) || 0;
    });
    return stats;
  }, [yearRecords]);

  const monthlySummary = useMemo(() => monthLabels.map(m => ({
    month: Number(m),
    income: monthStats[Number(m)]?.income || 0,
    expense: monthStats[Number(m)]?.expense || 0,
    net: (monthStats[Number(m)]?.income || 0) - (monthStats[Number(m)]?.expense || 0),
  })), [monthLabels, monthStats]);

  // 이번달 총합
  const monthTotal = useMemo(() => {
    let income = 0, expense = 0;
    monthRecords.forEach(r => {
      if (r.recordType === 'INCOME') income += Number(r.cost) || 0;
      else expense += Number(r.cost) || 0;
    });
    return {
      income,
      expense,
      net: income - expense,
    };
  }, [monthRecords]);

  // 이번년도 총합
  const yearTotal = useMemo(() => {
    let income = 0, expense = 0;
    yearRecords.forEach(r => {
      if (r.recordType === 'INCOME') income += Number(r.cost) || 0;
      else expense += Number(r.cost) || 0;
    });
    return {
      income,
      expense,
      net: income - expense,
    };
  }, [yearRecords]);

  // 그래프 데이터
  const totalGraphData = useMemo(() => {
    return {
      labels: monthLabels.map((v) => `${v}월`),
      datasets: [
        {
          label: '수입',
          data: monthLabels.map(m => monthStats[Number(m)]?.income || 0),
          backgroundColor: '#3ad29f',
        },
        {
          label: '지출',
          data: monthLabels.map(m => monthStats[Number(m)]?.expense || 0),
          backgroundColor: '#5b5fc7',
        },
      ],
    };
  }, [monthLabels, monthStats]);

  return {
    dashboardYear, setDashboardYear, dashboardMonth, setDashboardMonth,
    monthlySummary, totalGraphData,
    yearTotal, monthTotal,
    yearLoading, monthLoading
  };
}
