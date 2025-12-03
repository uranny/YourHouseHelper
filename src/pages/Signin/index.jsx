import * as S from './styled'
import { useSignin } from '../../hooks/useSignin';
import { useNavigate } from 'react-router-dom';

function Signin(){
    const { id, setId, pw, setPw, error, loading, handleSignin } = useSignin();
    const navigate = useNavigate();
    return (
        <S.Layout>
            <h2 style={{ color: '#fff', fontWeight: 600, fontSize: '1.5em', marginTop : "2em", marginLeft : '12rem'}}>로그인</h2>
            <S.InputRow>
                <S.Label>아이디</S.Label>
                <S.Input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="아이디" autoFocus />
            </S.InputRow>
            <S.InputRow>
                <S.Label>비밀번호</S.Label>
                <S.Input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="비밀번호" />
            </S.InputRow>
            {error && <div style={{ color: '#ff5b5b', fontWeight: 500, marginTop : '1em', marginLeft  : '12rem', marginRight : '12rem'}}>{error}</div>}
            <S.Button onClick={handleSignin} disabled={loading}>
                {loading ? '로그인 중...' : '로그인'}
            </S.Button>
            <S.TextBtn type="button" onClick={() => navigate('/signup')}>회원가입</S.TextBtn>
        </S.Layout>
    )
}

export default Signin;