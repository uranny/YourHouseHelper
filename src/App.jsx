import * as S from './styled';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import RouterSetup from './router/RouterSetup';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  return (
    <S.Layout>
      <S.Sidebar>
        <S.SidebarLogo>
          당신의 <span style={{color:'#5b5fc7'}}>하우스 헬퍼</span>
        </S.SidebarLogo>
        <S.SidebarMenu>
          <S.SidebarItem>
            <S.SidebarLink as="a" href="/dashboard">수입/지출 한눈에 보기</S.SidebarLink>
          </S.SidebarItem>
          <S.SidebarItem>
            <S.SidebarLink as="a" href="/table">수입/지출 내역</S.SidebarLink>
          </S.SidebarItem>
          <S.SidebarItem>
            <S.SidebarLink as="a" href="/total-graph">수입/지출 그래프</S.SidebarLink>
          </S.SidebarItem>
        </S.SidebarMenu>
      </S.Sidebar>
      <S.Main>
        <RouterSetup />
      </S.Main>
    </S.Layout>
  );
}

export default App;
