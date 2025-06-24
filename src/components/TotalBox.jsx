import React from 'react';
import * as S from '../styled';

function TotalBox({ totalIncome, totalExpense, totalNet }) {
    return (
        <>
            <S.Total style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2.2em',
                border: '1.5px solid #5b5fc7',
                borderRadius: '10px',
                background: '#23263a',
                fontSize: '1.13em',
                fontWeight: 400,
                padding: '0.7em 0.5em',
                marginTop : '1em',
                boxShadow: 'none',
                letterSpacing: '0.01em',
            }}>
                <span style={{minWidth:'80px'}}>수입 : <b style={{color:'#3ad29f',fontWeight:500}}>{totalIncome.toLocaleString()}원</b></span>
                <span style={{borderLeft:'1px solid #5b5fc7',height:'1.3em',margin:'0 0.7em'}}></span>
                <span style={{minWidth:'80px'}}>지출 : <b style={{color:'#5b5fc7',fontWeight:500}}>{totalExpense.toLocaleString()}원</b></span>
                <span style={{borderLeft:'1px solid #5b5fc7',height:'1.3em',margin:'0 0.7em'}}></span>
                <span style={{minWidth:'80px'}}>합계 : <b style={{color:'#fff',fontWeight:600}}>{totalNet.toLocaleString()}원</b></span>
            </S.Total>
        </>
    );
}

export default TotalBox;
