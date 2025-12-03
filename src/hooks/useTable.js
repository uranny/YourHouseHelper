import { useMemo, useState } from 'react';
import { useAccountBook } from './useAccountBook';

export function useTable() {
    const {
        selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, records, setRecords
    } = useAccountBook();

    const [newRecord, setNewRecord] = useState({ category: 'INCOME', amount: '', description: '', date: '' });

    const handleAddRecord = () => {
        if (!newRecord.amount || !newRecord.date) return;
        setRecords(prev => [...prev, { ...newRecord, amount: Number(newRecord.amount) }]);
        setNewRecord({ category: 'EXPENSE', amount: '', description: '', date: '' });
    };

    const filteredRecords = useMemo(() => {
        return records.filter(r => {
        const d = new Date(r.date);
        return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth;
        });
    }, [records, selectedYear, selectedMonth]);

    const handleEditRecord = (index, newData) => {
        if (!newData) return;
        const filtered = filteredRecords;
        const target = filtered[index];
        if (!target) return;
        setRecords(prevRecords =>
            prevRecords.map(r =>
                r === target ? { ...r, ...newData, amount: Number(newData.amount) } : r
            )
        );
    };

    const handleDeleteRecord = (index) => {
        const filtered = filteredRecords;
        const target = filtered[index];
        if (!target) return;

        setRecords(prevRecords => prevRecords.filter(r => r !== target));
    };

    const CATEGORIES = {
        INCOME: '수입',
        EXPENSE: '지출',
    };

    return {
        newRecord, setNewRecord, handleAddRecord,
        selectedYear, setSelectedYear, selectedMonth, setSelectedMonth,
        filteredRecords, handleEditRecord, handleDeleteRecord, CATEGORIES
    };
}
