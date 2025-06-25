import React from 'react';
import * as S from './styled'; // 스타일 컴포넌트를 불러옴

// EditModal 컴포넌트: 수입/지출 내역을 수정하는 모달 창
function EditModal({ open, value, onChange, onSave, onCancel }) {
    if (!open) return null; // 모달이 열려 있지 않으면 아무것도 렌더링하지 않음

    return (
        <S.Overlay> {/* 모달 뒷배경 오버레이 */}
            <S.ModalBox> {/* 모달 본문 박스 */}
                <h2 style={{marginTop:0, marginBottom:'1.5em', fontWeight:700}}>내역 수정</h2>

                {/* 날짜 입력 */}
                <S.Row>
                    <S.Label>날짜</S.Label>
                    <S.Input
                        type="date"
                        name="date"
                        value={value.date}
                        onChange={onChange}
                    />
                </S.Row>

                {/* 구분 선택 (수입/지출) */}
                <S.Row>
                    <S.Label>구분</S.Label>
                    <S.Select
                        name="category"
                        value={value.category}
                        onChange={onChange}
                    >
                        <option value="INCOME">수입</option>
                        <option value="EXPENSE">지출</option>
                    </S.Select>
                </S.Row>

                {/* 금액 입력 */}
                <S.Row>
                    <S.Label>금액</S.Label>
                    <S.Input
                        type="number"
                        name="amount"
                        value={value.amount}
                        onChange={onChange}
                    />
                </S.Row>

                {/* 사유(메모) 입력 */}
                <S.Row>
                    <S.Label>사유</S.Label>
                    <S.Input
                        type="text"
                        name="description"
                        value={value.description}
                        onChange={onChange}
                    />
                </S.Row>

                {/* 버튼 영역: 저장 / 취소 */}
                <S.ButtonRow>
                    <S.Button onClick={onSave}>저장</S.Button>
                    <S.Button
                        style={{ background: '#444', color: '#fff' }}
                        onClick={onCancel}
                    >
                        취소
                    </S.Button>
                </S.ButtonRow>
            </S.ModalBox>
        </S.Overlay>
    );
}

export default EditModal; // 외부에서 사용할 수 있도록 export
