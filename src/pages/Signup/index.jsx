import * as S from './styled'
import { useSignup } from '../../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const { id, setId, pw, setPw, pwCheck, setPwCheck, error, success, loading, handleSignup } = useSignup();
    const navigate = useNavigate();
    return (
        <S.Layout>
            <h2 style={{ color: '#fff', fontWeight: 600, fontSize: '1.5em', marginTop : "2em", marginLeft : '12rem'}}>회원가입</h2>
            <S.InputRow>
                <S.Label>아이디</S.Label>
                <S.Input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="아이디" autoFocus />
            </S.InputRow>
            <S.InputRow>
                <S.Label>비밀번호</S.Label>
                <S.Input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="비밀번호" />
            </S.InputRow>
            <S.InputRow>
                <S.Label>비밀번호 확인</S.Label>
                <S.Input type="password" value={pwCheck} onChange={e => setPwCheck(e.target.value)} placeholder="비밀번호 확인" />
            </S.InputRow>
            {error && <div style={{ color: '#ff5b5b', fontWeight: 500, marginTop : '1em', marginLeft  : '12rem', marginRight : '12rem'}}>{error}</div>}
            {success && <div style={{ color: '#3ad29f', fontWeight: 500, marginTop : '1em', marginLeft  : '12rem', marginRight : '12rem'}}>회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.</div>}
            <S.Button onClick={handleSignup} disabled={loading}>
                {loading ? '회원가입 중...' : '회원가입'}
            </S.Button>
            <S.TextBtn type="button" onClick={() => navigate('/signin')}>로그인</S.TextBtn>
        </S.Layout>
    )
}

export default Signup