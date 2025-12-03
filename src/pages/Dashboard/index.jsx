import DashboardSummary from '../../components/DashboardSummary';
import YearlyGraph from '../../components/YearlyGraph';
import DashboardTable from '../../components/DashboardTable';
import * as S from './styled';
import { useDashboard } from '../../hooks/useDashboard';

function Dashboard() {
  const {
    dashboardYear, setDashboardYear, yearLabels,
    getYearSummary, yearlySummary, totalGraphData, records, CATEGORIES
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
          {yearLabels.map(y => (
            <option key={y} value={y}>{y}년</option>
          ))}
        </S.Select>
      </S.DashboardYearSelectBar>
      <DashboardSummary
        year={dashboardYear}
        income={getYearSummary(dashboardYear).income}
        expense={getYearSummary(dashboardYear).expense}
        net={getYearSummary(dashboardYear).net}
      />
      <div style={{ background: '#23263a', borderRadius: 12, padding: '1.5em', marginBottom: '2em', overflowX: 'auto'  }}>
        <div style={{ color: '#fff', fontWeight: 600, marginBottom: '1em' }}>연도별 총합</div>
        <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse', fontSize: '1em', overflowX: 'auto' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #444' }}>
              <th style={{ padding: '0.5em' }}>연도</th>
              <th style={{ padding: '0.5em', color: '#3ad29f' }}>수입</th>
              <th style={{ padding: '0.5em', color: '#5b5fc7' }}>지출</th>
              <th style={{ padding: '0.5em' }}>합계</th>
            </tr>
          </thead>
          <tbody>
            {yearlySummary.map(row => (
              <tr key={row.year} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '0.5em', textAlign: 'center' }}>{row.year}</td>
                <td style={{ padding: '0.5em', textAlign: 'right', color: '#3ad29f' }}>
                  {row.income.toLocaleString()}원
                </td>
                <td style={{ padding: '0.5em', textAlign: 'right', color: '#5b5fc7' }}>
                  {row.expense.toLocaleString()}원
                </td>
                <td style={{ padding: '0.5em', textAlign: 'right', fontWeight: 600 }}>
                  {row.net.toLocaleString()}원
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <YearlyGraph data={totalGraphData} />
      <DashboardTable
        records={records.filter(r =>
          r.date &&
          new Date(r.date).getFullYear() === dashboardYear &&
          new Date(r.date).getMonth() + 1 === new Date().getMonth() + 1
        )}
        CATEGORIES={CATEGORIES}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5em' }}>
        <S.Button as="a" href="/table">+ 수입/지출 내역 추가하기</S.Button>
      </div>
    </S.DashboardPageWrapper>
  );
}

export default Dashboard;
