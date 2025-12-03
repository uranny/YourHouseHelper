import * as S from './styled';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import RouterSetup from './router/RouterSetup';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  return (
    <S.Layout>
      <S.HeaderBar>
        <S.HeaderWrapper>
          <S.HeaderLogo>
            당신의 <span style={{color:'#5b5fc7'}}>하우스 헬퍼</span>
          </S.HeaderLogo>
          <S.HeaderMenu>
            <S.HeaderLink as="a" href="/dashboard">대시 보드</S.HeaderLink>
            <S.HeaderLink as="a" href="/table">수입/지출 내역</S.HeaderLink>
          </S.HeaderMenu>
          <S.HeaderLink as="a" href="/signin">로그인</S.HeaderLink>
        </S.HeaderWrapper>
      </S.HeaderBar>
      <S.Main>
        <RouterSetup />
      </S.Main>
    </S.Layout>
  );
}

export default App;
