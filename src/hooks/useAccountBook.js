import { useMemo, useState, useEffect } from 'react';

export function useAccountBook() {
    const now = new Date();
    // 연/월 선택
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
    const yearRange = Array.from({ length: 26 }, (_, i) => now.getFullYear() - 25 + i);
    const monthRange = Array.from({ length: 12 }, (_, i) => i + 1);
    // 대시보드 연도
    const [dashboardYear, setDashboardYear] = useState(now.getFullYear());
    // 탭
    const [tab, setTab] = useState('dashboard');
    // 그래프 뷰
    const [graphView, setGraphView] = useState('year');
    // 로컬스토리지에서 불러오기 (최초 1회)
    const getLocalRecords = () => {
        try {
            const data = localStorage.getItem('accountbook-records');
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    };
    const [records, setRecords] = useState(getLocalRecords());
    // 새 내역
    const [newRecord, setNewRecord] = useState({ category: 'EXPENSE', amount: '', description: '', date: '' });
    // 내역 추가
    const handleAddRecord = () => {
        if (!newRecord.amount || !newRecord.date) return;
        setRecords(prev => [...prev, { ...newRecord, amount: Number(newRecord.amount) }]);
        setNewRecord({ category: 'EXPENSE', amount: '', description: '', date: '' });
    };
    // 내역 수정
    const handleEditRecord = (index, newData) => {
        if (!newData) return;
        const filteredRecords = getFilteredRecords();
        const target = filteredRecords[index];
        if (!target) return;
        setRecords(records => records.map(r =>
            (r === target ? { ...r, ...newData, amount: Number(newData.amount) } : r)
        ));
    };
    // 내역 삭제
    const handleDeleteRecord = (index) => {
        const filteredRecords = getFilteredRecords();
        const target = filteredRecords[index];
        if (!target) return;
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        setRecords(records => records.filter(r => r !== target));
    };
    // records가 바뀔 때마다 로컬스토리지에 저장
    useEffect(() => {
        localStorage.setItem('accountbook-records', JSON.stringify(records));
    }, [records]);
    // NAV_ITEMS
    const NAV_ITEMS = [
        { key: 'dashboard', label: '수입/지출 한눈에 보기' },
        { key: 'table', label: '수입/지출 내역' },
        { key: 'total-graph', label: '수입/지출 그래프' },
    ];
    // 필터링된 내역 (월별)
    const getFilteredRecords = () => records.filter(r => {
        const d = new Date(r.date);
        return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth;
    });
    const filteredRecords = useMemo(getFilteredRecords, [records, selectedYear, selectedMonth]);

    // 월별 내역 필터링
    const filteredRecordsMemo = useMemo(() => {
        return records.filter(r => {
        const d = new Date(r.date);
        return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth;
        });
    }, [records, selectedYear, selectedMonth]);

    // 월별 합계
    const { totalIncome, totalExpense, totalNet } = useMemo(() => {
        let totalIncome = 0, totalExpense = 0;
        filteredRecordsMemo.forEach(r => {
        if (r.category === 'INCOME') totalIncome += Number(r.amount) || 0;
        else totalExpense += Number(r.amount) || 0;
        });
        return { totalIncome, totalExpense, totalNet: totalIncome - totalExpense };
    }, [filteredRecordsMemo]);

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
    // 연도별 요약 배열 (표용)
    const yearlySummary = useMemo(() => yearLabels.map(y => ({
        year: Number(y),
        income: yearStats[y]?.income || 0,
        expense: yearStats[y]?.expense || 0,
        net: (yearStats[y]?.income || 0) - (yearStats[y]?.expense || 0),
    })), [yearLabels, yearStats]);
    // 특정 연도 요약
    const getYearSummary = (year) => {
        const y = String(year);
        return {
            income: yearStats[y]?.income || 0,
            expense: yearStats[y]?.expense || 0,
            net: (yearStats[y]?.income || 0) - (yearStats[y]?.expense || 0),
        };
    };
    // 특정 연/월 요약
    const getMonthSummary = (year, month) => {
        let income = 0, expense = 0;
        records.forEach(r => {
            if (!r.date) return;
            const d = new Date(r.date);
            if (d.getFullYear() === year && d.getMonth() + 1 === month) {
                if (r.category === 'INCOME') income += Number(r.amount) || 0;
                else expense += Number(r.amount) || 0;
            }
        });
        return { income, expense, net: income - expense };
    };

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
        NAV_ITEMS, tab, setTab,
        selectedYear, setSelectedYear, selectedMonth, setSelectedMonth,
        yearRange, monthRange,
        dashboardYear, setDashboardYear,
        newRecord, setNewRecord, handleAddRecord,
        filteredRecords, handleEditRecord, handleDeleteRecord,
        records,
        graphView, setGraphView,
        filteredRecordsMemo,
        totalIncome,
        totalExpense,
        totalNet,
        incomeGraphData,
        expenseGraphData,
        totalGraphData,
        yearLabels,
        yearStats,
        yearlySummary,
        getYearSummary,
        getMonthSummary,
    };
}
