import React, { useState } from 'react';
import * as S from './styled';
import EditModal from '../EditModal/EditModal';

function RecordTable({ filteredRecords, CATEGORIES, onEdit, onDelete }) {
    // 현재 수정 중인 항목의 인덱스 상태 (null이면 수정 모드 아님)
    const [editIndex, setEditIndex] = useState(null);
    // 수정 중인 항목의 데이터 상태
    const [editData, setEditData] = useState({ category: 'EXPENSE', amount: '', description: '', date: '' });

    // 날짜 기준 오름차순 정렬, 날짜가 같으면 지출(EXPENSE)이 수입(INCOME)보다 먼저 오도록 정렬
    const sortedRecords = [...filteredRecords].sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        if (a.category === b.category) return 0;
        if (a.category === 'EXPENSE') return -1;
        return 1;
    });

    // 수정 버튼 클릭 시 호출, 해당 항목 인덱스를 저장하고 수정할 데이터를 세팅
    const handleEditClick = (idx) => {
        setEditIndex(idx);
        const r = sortedRecords[idx];
        setEditData({ ...r });
    };

    // 수정 입력폼의 각 입력값 변경 시 상태 업데이트
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    // 저장 버튼 클릭 시 호출, 수정 완료 후 모달 닫기
    const handleEditSave = () => {
        // 실제 원본 배열에서 수정할 인덱스를 찾아 onEdit 콜백 호출
        onEdit(filteredRecords.indexOf(sortedRecords[editIndex]), editData);
        setEditIndex(null);
    };

    // 수정 취소 시 모달 닫기
    const handleEditCancel = () => {
        setEditIndex(null);
    };

    return (
        <>
            {/* 수정 모달, editIndex가 null이 아니면 열림 */}
            <EditModal
                open={editIndex !== null}
                value={editData}
                onChange={handleEditChange}
                onSave={handleEditSave}
                onCancel={handleEditCancel}
            />

            {/* 테이블 래퍼 */}
            <S.TableWrapper>
                <S.Table>
                    <thead>
                        <tr>
                            <S.Th>날짜</S.Th>
                            <S.Th>구분</S.Th>
                            <S.Th>금액</S.Th>
                            <S.Th>사유</S.Th>
                            <S.Th>수정</S.Th>
                            <S.Th>삭제</S.Th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* 기록이 없으면 안내 문구 표시 */}
                        {sortedRecords.length === 0 ? (
                            <tr>
                                <S.Td colSpan={6} style={{ textAlign: 'center', color: '#aaa' }}>
                                    내역이 없습니다.
                                </S.Td>
                            </tr>
                        ) : (
                            // 기록 목록 출력
                            sortedRecords.map((r, i) => (
                                <S.Tr key={i}>
                                    <S.Td>{r.date}</S.Td>
                                    <S.Td>{CATEGORIES[r.category]}</S.Td>
                                    {/* 수입은 초록색, 지출은 파란색으로 금액 표시 */}
                                    <S.Td style={{ color: r.category === 'INCOME' ? '#3ad29f' : '#5b5fc7', fontWeight: 500 }}>
                                        {Number(r.amount).toLocaleString()}원
                                    </S.Td>
                                    <S.Td>{r.description}</S.Td>

                                    {/* 수정 버튼: 클릭 시 수정 모드 진입 */}
                                    <S.Td>
                                        <button
                                            style={{ background: 'none', color: '#fff', border: 'none', cursor: 'pointer' }}
                                            onClick={() => handleEditClick(i)}
                                        >
                                            수정
                                        </button>
                                    </S.Td>

                                    {/* 삭제 버튼: 클릭 시 해당 기록 삭제 */}
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
