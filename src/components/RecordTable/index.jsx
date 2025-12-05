import { useState } from 'react';
import * as S from './styled';
import EditModal from '../EditModal/index';

function RecordTable({ filteredRecords, CATEGORIES, onEdit, onDelete }) {
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({ recordType: 'EXPENSE', cost: '', description: '', date: '' });

    const sortedRecords = [...filteredRecords].sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        if (a.recordType === b.recordType) return 0;
        if (a.recordType === 'EXPENSE') return -1;
        return 1;
    });

    const handleEditClick = (idx) => {
        setEditIndex(idx);
        const r = sortedRecords[idx];
        setEditData({ ...r });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSave = () => {
        onEdit(filteredRecords.indexOf(sortedRecords[editIndex]), editData);
        setEditIndex(null);
    };

    const handleEditCancel = () => {
        setEditIndex(null);
    };

    return (
        <>
            <EditModal
                open={editIndex !== null}
                value={editData}
                onChange={handleEditChange}
                onSave={handleEditSave}
                onCancel={handleEditCancel}
            />
            <S.TableWrapper>
                <S.Table>
                    <thead>
                        <S.Tr>
                            <S.Th>날짜</S.Th>
                            <S.Th>구분</S.Th>
                            <S.Th>금액</S.Th>
                            <S.Th>사유</S.Th>
                            <S.Th>수정</S.Th>
                            <S.Th>삭제</S.Th>
                        </S.Tr>
                    </thead>
                    <tbody style={{position : 'relative', overflow : 'visible'}}>
                        {sortedRecords.length === 0 ? (
                            <tr>
                                <S.Td colSpan={6} style={{ textAlign: 'center', color: '#aaa' }}>
                                    내역이 없습니다.
                                </S.Td>
                            </tr>
                        ) : (
                            sortedRecords.map((r, i) => (
                                <S.Tr key={i}>
                                    <S.Td>{r.date}</S.Td>
                                    <S.Td>{CATEGORIES[r.recordType]}</S.Td>
                                    <S.Td style={{ color: r.recordType === 'INCOME' ? '#3ad29f' : '#5b5fc7', fontWeight: 500 }}>
                                        {Number(r.cost).toLocaleString()}원
                                    </S.Td>
                                    <S.Td>
                                        {r.description}
                                    </S.Td>
                                    <S.Td>
                                        <button
                                            style={{ background: 'none', color: '#fff', border: 'none', cursor: 'pointer' }}
                                            onClick={() => handleEditClick(i)}
                                        >
                                            수정
                                        </button>
                                    </S.Td>
                                    <S.Td>
                                        <button
                                            style={{ background: 'none', color: '#fff', border: 'none', cursor: 'pointer' }}
                                            onClick={() => onDelete(filteredRecords.indexOf(r))}
                                        >
                                            삭제
                                        </button>
                                    </S.Td>
                                </S.Tr>
                            ))
                        )}
                    </tbody>
                </S.Table>
            </S.TableWrapper>
        </>
    );
}

export default RecordTable;
