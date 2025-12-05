import DashboardSummary from '../../components/DashboardSummary';
import YearlyGraph from '../../components/YearlyGraph';
import DashboardTable from '../../components/DashboardTable';
import * as S from './styled';
import { useDashboard } from '../../hooks/useDashboard';

function Dashboard() {
  const {
    dashboardYear, setDashboardYear, dashboardMonth,
    monthlySummary, totalGraphData,
    yearTotal, monthTotal,
  } = useDashboard();

  return (
    <S.DashboardPageWrapper>
      <S.DashboardYearSelectBar>
        <label htmlFor="dashboard-year-select" style={{ color: '#fff', fontWeight: 500 }}>
          연도 선택:
        </label>
        <S.Select
          id="dashboard-year-select"
          value={dashboardYear}
          onChange={e => setDashboardYear(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return <option key={y} value={y}>{y}년</option>;
          })}
        </S.Select>
      </S.DashboardYearSelectBar>
      <DashboardSummary
        year={dashboardYear}
        income={yearTotal.income}
        expense={yearTotal.expense}
        net={yearTotal.net}
      />
      <div style={{ background: '#23263a', borderRadius: 12, padding: '1.5em', overflowX: 'auto'  }}>
        <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse', fontSize: '1em', overflowX: 'auto' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #444' }}>
              <th style={{ flex : 1,  padding: '0.5em' }}>월별</th>
              <th style={{ flex : 1,  padding: '0.5em', color: '#3ad29f' }}>수입</th>
              <th style={{ flex : 1,  padding: '0.5em', color: '#5b5fc7' }}>지출</th>
              <th style={{ flex : 1,  padding: '0.5em' }}>합계</th>
            </tr>
          </thead>
          <tbody>
            {monthlySummary.map(row => (
              <tr key={row.month} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ flex : 1, padding: '0.5em', textAlign: 'center' }}>{row.month + '월'}</td>
                <td style={{  flex : 1, padding: '0.5em', textAlign: 'center', color: '#3ad29f' }}>
                  {row.income.toLocaleString()}원
                </td>
                <td style={{  flex : 1, padding: '0.5em', textAlign: 'center', color: '#5b5fc7' }}>
                  {row.expense.toLocaleString()}원
                </td>
                <td style={{  flex : 1, padding: '0.5em', textAlign: 'center', fontWeight: 600 }}>
                  {row.net.toLocaleString()}원
                </td>
              </tr>
            ))}
            <tr style={{ borderBottom: '1px solid #333' }}>
              <td style={{ flex : 1, padding: '0.5em', textAlign: 'center' }}>총합</td>
              <td style={{  flex : 1, padding: '0.5em', textAlign: 'center', color: '#3ad29f' }}>
                {yearTotal.income.toLocaleString()}원
              </td>
              <td style={{  flex : 1, padding: '0.5em', textAlign: 'center', color: '#5b5fc7' }}>
                {yearTotal.expense.toLocaleString()}원
              </td>
              <td style={{  flex : 1, padding: '0.5em', textAlign: 'center', fontWeight: 600 }}>
                {yearTotal.net.toLocaleString()}원
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <YearlyGraph data={totalGraphData} />
    </S.DashboardPageWrapper>
  );
}

export default Dashboard;
