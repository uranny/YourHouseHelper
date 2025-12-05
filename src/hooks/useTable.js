import { useMemo, useState } from 'react';
import { useAccountBook } from './useAccountBook';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recordApi } from '../api/record';
import { QUERY_KEYS } from '../constants/query';

export function useTable() {
    const {
        selectedYear, setSelectedYear, selectedMonth, setSelectedMonth
    } = useAccountBook();
    const queryClient = useQueryClient();
    const [newRecord, setNewRecord] = useState({ recordType: 'INCOME', cost: '', description: '', date: '' });

    // 기록 목록 조회
    const { data, isLoading, refetch } = useQuery({
        queryKey: [QUERY_KEYS.RECORDS, selectedYear, selectedMonth],
        queryFn: async () => {
            const lastDay = String(new Date(selectedYear, selectedMonth, 0).getDate()).padStart(2, '0')
            const startDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`;
            const endDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${lastDay}`;
            const res = await recordApi.list({ startDate, endDate });
            return res.data.data || [];
        },
    });

    // 기록 추가
    const addMutation = useMutation({
        mutationKey: [QUERY_KEYS.RECORD_CREATE],
        mutationFn: (payload) => recordApi.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RECORDS, selectedYear, selectedMonth] });
            setNewRecord({ recordType: 'EXPENSE', cost: '', description: '', date: '' });
        },
        onError : ((error) => {console.log(error)})
    });

    // 기록 수정
    const editMutation = useMutation({
        mutationKey: [QUERY_KEYS.RECORD_UPDATE],
        mutationFn: ({ id, updateData }) => recordApi.update(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RECORDS, selectedYear, selectedMonth] });
        },
        onError : ((error) => {console.log(error)})
    });

    // 기록 삭제
    const deleteMutation = useMutation({
        mutationKey: [QUERY_KEYS.RECORD_DELETE],
        mutationFn: (id) => recordApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RECORDS, selectedYear, selectedMonth] });
        },
        onError : ((error) => {console.log(error)})
    });

    const filteredRecords = data || [];

    const handleAddRecord = () => {
        if (!newRecord.cost || !newRecord.date) return;
        addMutation.mutate({
            recordType: newRecord.recordType,
            cost: Number(newRecord.cost),
            description: newRecord.description,
            date: newRecord.date,
        });
    };

    const handleEditRecord = (index, newData) => {
        const target = filteredRecords[index];
        if (!target) return;
        editMutation.mutate({
            id: target.id,
            updateData: {
                recordType: newData.recordType,
                cost: Number(newData.cost),
                description: newData.description,
                date: newData.date,
            },
        });
    };

    const handleDeleteRecord = (index) => {
        const target = filteredRecords[index];
        if (!target) return;
        deleteMutation.mutate(target.id);
    };

    const CATEGORIES = {
        INCOME: '수입',
        EXPENSE: '지출',
    };

    return {
        newRecord, setNewRecord, handleAddRecord,
        selectedYear, setSelectedYear, selectedMonth, setSelectedMonth,
        filteredRecords, handleEditRecord, handleDeleteRecord, CATEGORIES,
        isLoading, refetch
    };
}
