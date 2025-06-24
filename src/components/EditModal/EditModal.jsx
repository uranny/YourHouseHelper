import React from 'react';
import * as S from './styled';

function EditModal({ open, value, onChange, onSave, onCancel }) {
    if (!open) return null;
    return (
        <S.Overlay>
            <S.ModalBox>
                <h2 style={{marginTop:0,marginBottom:'1.5em',fontWeight:700}}>내역 수정</h2>
                <S.Row>
                    <S.Label>날짜</S.Label>
                    <S.Input type="date" name="date" value={value.date} onChange={onChange} />
                </S.Row>
                <S.Row>
                    <S.Label>구분</S.Label>
                    <S.Select name="category" value={value.category} onChange={onChange}>
                        <option value="INCOME">수입</option>
                        <option value="EXPENSE">지출</option>
                    </S.Select>
                </S.Row>
                <S.Row>
                    <S.Label>금액</S.Label>
                    <S.Input type="number" name="amount" value={value.amount} onChange={onChange} />
                </S.Row>
                <S.Row>
                    <S.Label>사유</S.Label>
                    <S.Input type="text" name="description" value={value.description} onChange={onChange} />
                </S.Row>
                <S.ButtonRow>
                    <S.Button onClick={onSave}>저장</S.Button>
                    <S.Button style={{background:'#444',color:'#fff'}} onClick={onCancel}>취소</S.Button>
                </S.ButtonRow>
            </S.ModalBox>
        </S.Overlay>
    );
}

export default EditModal;
