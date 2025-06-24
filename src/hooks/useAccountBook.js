import { useMemo, useState, useEffect } from 'react';

// 가계부 데이터를 관리하는 커스텀 훅
export function useAccountBook() {
    const now = new Date(); // 현재 시각 기준 날짜 객체 생성

    // 선택된 연도와 월 (기본값: 현재 연도/월)
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1); // JS 월은 0~11

    // 연도 선택 범위: 현재 연도를 기준으로 -25년부터 +0년까지 총 26개
    const yearRange = Array.from({ length: 26 }, (_, i) => now.getFullYear() - 25 + i);

    // 월 선택 범위: 1~12월
    const monthRange = Array.from({ length: 12 }, (_, i) => i + 1);

    // 대시보드에서 선택된 연도 (기본값: 현재 연도)
    const [dashboardYear, setDashboardYear] = useState(now.getFullYear());

    // 현재 탭 상태 (기본값: dashboard)
    const [tab, setTab] = useState('dashboard');

    // 그래프에서 보여줄 단위 (year, month, day 중 선택)
    const [graphView, setGraphView] = useState('year');

    // 로컬스토리지에서 데이터 가져오기 (에러 시 빈 배열 반환)
    const getLocalRecords = () => {
        try {
            const data = localStorage.getItem('accountbook-records');
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    };

    // 기록 배열 상태 (로컬스토리지에서 초기화)
    const [records, setRecords] = useState(getLocalRecords());

    // 새 내역을 입력할 때 사용하는 상태 (입력 폼 용도)
    const [newRecord, setNewRecord] = useState({ category: 'EXPENSE', amount: '', description: '', date: '' });

    // 새 내역 추가 핸들러
    const handleAddRecord = () => {
        if (!newRecord.amount || !newRecord.date) return; // 금액 또는 날짜가 없으면 무시
        setRecords(prev => [...prev, { ...newRecord, amount: Number(newRecord.amount) }]); // 금액 숫자형으로 추가
        setNewRecord({ category: 'EXPENSE', amount: '', description: '', date: '' }); // 입력 초기화
    };

    // 기존 내역 수정 핸들러
    const handleEditRecord = (index, newData) => {
        if (!newData) return;
        const filteredRecords = getFilteredRecords(); // 현재 필터링된 내역 가져오기
        const target = filteredRecords[index]; // 수정 대상
        if (!target) return;
        setRecords(records =>
            records.map(r =>
                (r === target ? { ...r, ...newData, amount: Number(newData.amount) } : r)
            )
        );
    };

    // 기존 내역 삭제 핸들러
    const handleDeleteRecord = (index) => {
        const filteredRecords = getFilteredRecords();
        const target = filteredRecords[index]; // 삭제 대상
        if (!target) return;
        if (!window.confirm('정말 삭제하시겠습니까?')) return; // 사용자 확인
        setRecords(records => records.filter(r => r !== target)); // 대상 삭제
    };

    // 기록이 바뀔 때마다 로컬스토리지에 자동 저장
    useEffect(() => {
        localStorage.setItem('accountbook-records', JSON.stringify(records));
    }, [records]);

    // 네비게이션 탭 항목들
    const NAV_ITEMS = [
        { key: 'dashboard', label: '수입/지출 한눈에 보기' },
        { key: 'table', label: '수입/지출 내역' },
        { key: 'total-graph', label: '수입/지출 그래프' },
    ];

    // 월별로 필터링된 내역 가져오기 (함수)
    const getFilteredRecords = () => records.filter(r => {
        const d = new Date(r.date);
        return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth;
    });

    // 월별 내역 필터링 (useMemo로 최적화)
    const filteredRecords = useMemo(getFilteredRecords, [records, selectedYear, selectedMonth]);

    // 위와 동일한 기능 (중복 최적화 구조 – 나중에 통합 가능)
    const filteredRecordsMemo = useMemo(() => {
        return records.filter(r => {
            const d = new Date(r.date);
            return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth;
        });
    }, [records, selectedYear, selectedMonth]);

    // 현재 월의 총 수입, 지출, 순이익 계산
    const { totalIncome, totalExpense, totalNet } = useMemo(() => {
        let totalIncome = 0, totalExpense = 0;
        filteredRecordsMemo.forEach(r => {
            if (r.category === 'INCOME') totalIncome += Number(r.amount) || 0;
            else totalExpense += Number(r.amount) || 0;
        });
        return { totalIncome, totalExpense, totalNet: totalIncome - totalExpense };
    }, [filteredRecordsMemo]);

    // 전체 기록을 월 단위로 집계
    const monthlyStats = useMemo(() => {
        const stats = {};
        records.forEach(r => {
            if (!r.date) return;
            const ym = r.date.slice(0, 7); // yyyy-mm
            if (!stats[ym]) stats[ym] = { income: 0, expense: 0 };
            if (r.category === 'INCOME') stats[ym].income += Number(r.amount) || 0;
            else stats[ym].expense += Number(r.amount) || 0;
        });
        return stats;
    }, [records]);

    // 월 정렬 (그래프용 라벨)
    const months = Object.keys(monthlyStats).sort();

    // 연도별 라벨 리스트 생성
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

    // 연도별 수입/지출 합계
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

    // 연도별 요약 데이터를 배열로 구성 (표 용도)
    const yearlySummary = useMemo(() => yearLabels.map(y => ({
        year: Number(y),
        income: yearStats[y]?.income || 0,
        expense: yearStats[y]?.expense || 0,
        net: (yearStats[y]?.income || 0) - (yearStats[y]?.expense || 0),
    })), [yearLabels, yearStats]);

    // 특정 연도 요약 반환
    const getYearSummary = (year) => {
        const y = String(year);
        return {
            income: yearStats[y]?.income || 0,
            expense: yearStats[y]?.expense || 0,
            net: (yearStats[y]?.income || 0) - (yearStats[y]?.expense || 0),
        };
    };

    // 특정 연/월 요약 반환
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

    // 날짜별 라벨 생성 (일 단위)
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

    // 날짜별 집계
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

    // 현재 그래프 보기 설정에 따라 일별 라벨 필터링
    const filteredDayLabels = useMemo(() => {
        if (graphView !== 'day') return dayLabels;
        return dayLabels.filter(d => {
            const date = new Date(d);
            return date.getFullYear() === selectedYear && date.getMonth() + 1 === selectedMonth;
        });
    }, [dayLabels, graphView, selectedYear, selectedMonth]);

    // 월별 라벨 필터링
    const filteredMonthLabels = useMemo(() => {
        if (graphView !== 'month') return months;
        return months.filter(m => {
            const [y, mon] = m.split('-');
            return Number(y) === selectedYear;
        });
    }, [months, graphView, selectedYear]);

    // 수입 그래프 데이터
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

    // 지출 그래프 데이터
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

    // 수입/지출 그래프 데이터 통합
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

    // 훅에서 반환하는 상태 및 함수들
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
