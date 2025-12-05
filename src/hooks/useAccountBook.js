import { useMemo, useState, useEffect } from 'react';

export function useAccountBook() {
    const now = new Date();
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
    const [dashboardYear, setDashboardYear] = useState(now.getFullYear());
    const [dashboardMonth, setDashboardMonth] = useState(now.getMonth() + 1);
    const [tab, setTab] = useState('dashboard');
    const [graphView, setGraphView] = useState('year');
    const getLocalRecords = () => {
        try {
            const data = localStorage.getItem('accountbook-records');
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    };
    const [records, setRecords] = useState(getLocalRecords());
    useEffect(() => {
        localStorage.setItem('accountbook-records', JSON.stringify(records));
    }, [records]);
    const NAV_ITEMS = [
        { key: 'dashboard', label: '수입/지출 한눈에 보기' },
        { key: 'table', label: '수입/지출 내역' },
        { key: 'total-graph', label: '수입/지출 그래프' },
    ];
    return {
        NAV_ITEMS, tab, setTab,
        selectedYear, setSelectedYear, selectedMonth, setSelectedMonth,
        dashboardYear, setDashboardYear,
        dashboardMonth, setDashboardMonth,
        records, setRecords,
        graphView, setGraphView,
    };
}
