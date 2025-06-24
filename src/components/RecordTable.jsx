import React from 'react';
import * as S from '../styled';

function RecordTable({ filteredRecords, CATEGORIES, totalIncome, totalExpense, totalNet }) {
    return (
        <>
        <S.Total style={{margin:'1.2em 0 0.7em 0',fontSize:'1.08em'}}>
            수입 : <b style={{color:'#3ad29f',fontWeight:500}}>{totalIncome.toLocaleString()}원</b>
            &nbsp;|&nbsp; 지출 : <b style={{color:'#5b5fc7',fontWeight:500}}>{totalExpense.toLocaleString()}원</b>
            &nbsp;|&nbsp; 합계 : <b style={{color:'#fff',fontWeight:600}}>{totalNet.toLocaleString()}원</b>
        </S.Total>
        <S.TableWrapper>
            <S.Table>
            <thead>
                <tr>
                    <S.Th>날짜</S.Th>
                    <S.Th>구분</S.Th>
                    <S.Th>금액</S.Th>
                    <S.Th>사유</S.Th>
                </tr>
            </thead>
            <tbody>
                {filteredRecords.length === 0 ? (
                <tr><S.Td colSpan={4} style={{textAlign:'center',color:'#aaa'}}>내역이 없습니다.</S.Td></tr>
                ) : (
                filteredRecords.map((r, i) => (
                    <tr key={i}>
                    <S.Td>{r.date}</S.Td>
                    <S.Td>{CATEGORIES[r.category]}</S.Td>
                    <S.Td style={{color: r.category === 'INCOME' ? '#3ad29f' : '#5b5fc7', fontWeight:500}}>￦{Number(r.amount).toLocaleString()}</S.Td>
                    <S.Td>{r.description}</S.Td>
                    </tr>
                ))
                )}
            </tbody>
            </S.Table>
        </S.TableWrapper>
        </>
    );
}

export default RecordTable;
