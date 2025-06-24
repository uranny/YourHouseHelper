import React from 'react';
import * as S from './styled';

function TotalBox({ totalIncome, totalExpense, totalNet }) {
    return (
        <S.Total>
            <span>수입 : <b style={{color:'#3ad29f',fontWeight:500, flex : 1}}>{totalIncome.toLocaleString()}원</b></span>
            <span>지출 : <b style={{color:'#5b5fc7',fontWeight:500, flex : 1}}>{totalExpense.toLocaleString()}원</b></span>
            <span>합계 : <b style={{color:'#fff',fontWeight:600, flex : 1}}>{totalNet.toLocaleString()}원</b></span>
        </S.Total>
    );
}

export default TotalBox;
