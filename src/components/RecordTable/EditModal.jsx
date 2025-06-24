import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.45);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ModalBox = styled.div`
    background: #23263a;
    border-radius: 12px;
    padding: 2.2em 2em 1.5em 2em;
    min-width: 320px;
    max-width: 95vw;
    box-shadow: 0 4px 32px 0 #0008;
    color: #fff;
`;
const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
    margin-bottom: 1.2em;
`;
const Label = styled.label`
    min-width: 60px;
    font-size: 1.08em;
`;
const Input = styled.input`
    background: #181a28;
    border: 1px solid #5b5fc7;
    border-radius: 6px;
    color: #fff;
    padding: 0.5em 0.8em;
    font-size: 1em;
    outline: none;
`;
const Select = styled.select`
    background: #181a28;
    border: 1px solid #5b5fc7;
    border-radius: 6px;
    color: #fff;
    padding: 0.5em 0.8em;
    font-size: 1em;
`;
const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1em;
`;
const Button = styled.button`
    background: #5b5fc7;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.5em 1.2em;
    font-size: 1em;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: #3ad29f;
        color: #23263a;
    }
`;

function EditModal({ open, value, onChange, onSave, onCancel }) {
    if (!open) return null;
    return (
        <Overlay>
        <ModalBox>
            <h2 style={{marginTop:0,marginBottom:'1.5em',fontWeight:700}}>내역 수정</h2>
            <Row>
            <Label>날짜</Label>
            <Input type="date" name="date" value={value.date} onChange={onChange} />
            </Row>
            <Row>
            <Label>구분</Label>
            <Select name="category" value={value.category} onChange={onChange}>
                <option value="INCOME">수입</option>
                <option value="EXPENSE">지출</option>
            </Select>
            </Row>
            <Row>
            <Label>금액</Label>
            <Input type="number" name="amount" value={value.amount} onChange={onChange} />
            </Row>
            <Row>
            <Label>사유</Label>
            <Input type="text" name="description" value={value.description} onChange={onChange} />
            </Row>
            <ButtonRow>
            <Button onClick={onSave}>저장</Button>
            <Button style={{background:'#444',color:'#fff'}} onClick={onCancel}>취소</Button>
            </ButtonRow>
        </ModalBox>
        </Overlay>
    );
}

export default EditModal;
