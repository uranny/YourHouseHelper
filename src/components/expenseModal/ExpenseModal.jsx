import React from 'react';
import { format } from 'date-fns';
import * as S from './styled';

function ExpenseModal({
    open,
    mode, // 'add' | 'edit' | 'view'
    selectedDate,
    newExpense,
    setNewExpense,
    editExpense,
    setEditExpense,
    onClose,
    onSubmit,
    onEditSubmit,
    onAddClick,
    onEditClick,
    expenses,
    CATEGORIES,
    editIndex,
    setModalMode
}) {
  // 날짜 key를 format으로 통일 (타임존 문제 방지)
    const dateKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
    const dayExpenses = expenses[dateKey] || [];
    return (
        <S.ModalOverlay open={open}>
            <S.ModalBox>
                {mode === 'add' ? (
                <>
                    <S.Title>{selectedDate && selectedDate.toLocaleDateString('ko-KR')} 지출 입력</S.Title>
                    <S.Input
                    type="number"
                    placeholder="금액"
                    value={newExpense.amount}
                    onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                    />
                    <S.Select
                    value={newExpense.category}
                    onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
                    >
                    {Object.entries(CATEGORIES).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                    </S.Select>
                    <S.Textarea
                    rows={2}
                    placeholder="설명"
                    value={newExpense.description}
                    onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
                    />
                    <S.Row>
                    <S.Button onClick={onClose}>취소</S.Button>
                    <S.Button primary onClick={onSubmit}>저장</S.Button>
                    </S.Row>
                </>
                ) : mode === 'edit' ? (
                <>
                    <S.Title>{selectedDate && selectedDate.toLocaleDateString('ko-KR')} 지출 수정</S.Title>
                    <S.Input
                    type="number"
                    placeholder="금액"
                    value={editExpense?.amount || ''}
                    onChange={e => setEditExpense({ ...editExpense, amount: e.target.value })}
                    />
                    <S.Select
                    value={editExpense?.category || 'FOOD'}
                    onChange={e => setEditExpense({ ...editExpense, category: e.target.value })}
                    >
                    {Object.entries(CATEGORIES).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                    </S.Select>
                    <S.Textarea
                    rows={2}
                    placeholder="설명"
                    value={editExpense?.description || ''}
                    onChange={e => setEditExpense({ ...editExpense, description: e.target.value })}
                    />
                    <S.Row>
                    <S.Button onClick={() => { setModalMode('view'); }}>취소</S.Button>
                    <S.Button primary onClick={onEditSubmit}>저장</S.Button>
                    </S.Row>
                </>
                ) : (
                <>
                    <S.Title>{selectedDate && selectedDate.toLocaleDateString('ko-KR')} 지출 내역</S.Title>
                    <S.ExpenseList>
                    {dayExpenses.map((expense, idx) => (
                        <S.ExpenseItem key={idx}>
                            <S.ExpenseItemContent>
                                <S.ExpenseInfo>{`${CATEGORIES[expense.category]}`}</S.ExpenseInfo>
                                <S.ExpenseInfo>지출</S.ExpenseInfo>
                                <S.ExpenseDesc>
                                    ￦{Number(expense.amount).toLocaleString()}
                                </S.ExpenseDesc>
                                <S.ExpenseInfo>설명</S.ExpenseInfo>
                                <S.ExpenseDesc>
                                    {expense.description && `${expense.description}`}
                                </S.ExpenseDesc>
                            </S.ExpenseItemContent>
                            <S.EditButton onClick={() => onEditClick(idx)}>수정</S.EditButton>
                        </S.ExpenseItem>
                    ))}
                    {dayExpenses.length === 0 && (
                        <S.EmptyText>지출 내역이 없습니다.</S.EmptyText>
                    )}
                    </S.ExpenseList>
                    <S.Row>
                    <S.Button onClick={onClose}>닫기</S.Button>
                    <S.Button primary onClick={onAddClick}>추가</S.Button>
                    </S.Row>
                </>
                )}
            </S.ModalBox>
        </S.ModalOverlay>
    );
}

export default ExpenseModal;
