import * as S from './styled';
import TopBar from './components/TopBar/TopBar';
import TotalBox from './components/TotalBox/TotalBox';
import RecordInput from './components/RecordInput/RecordInput';
import RecordTable from './components/RecordTable/RecordTable';
import GraphBox from './components/GraphBox/GraphBox';
import { useAccountBook } from './hooks/useAccountBook';
import DashboardSummary from './components/DashboardSummary/DashboardSummary';
import YearlyGraph from './components/YearlyGraph/YearlyGraph';
import DashboardTable from './components/DashboardTable/DashboardTable';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CATEGORIES = {
  INCOME: '수입',
  EXPENSE: '지출',
};

function App() {
  const {
    NAV_ITEMS, tab, setTab,
    selectedYear, setSelectedYear, selectedMonth, setSelectedMonth,
    yearRange, monthRange,
    dashboardYear, setDashboardYear, yearLabels,
    newRecord, setNewRecord, handleAddRecord,
    filteredRecords, handleEditRecord, handleDeleteRecord,
    totalIncome, totalExpense, totalNet,
    incomeGraphData, expenseGraphData, totalGraphData,
    yearlySummary, getYearSummary,
    graphView, setGraphView,
    records,
  } = useAccountBook();

  return (
    <S.Layout>
      <S.Sidebar>
        <S.SidebarLogo>
          당신의 <span style={{color:'#5b5fc7'}}>하우스 헬퍼</span>
        </S.SidebarLogo>
        <S.SidebarMenu>
          {NAV_ITEMS.map(item => (
            <S.SidebarItem key={item.key}>
              <S.SidebarLink $active={tab === item.key} onClick={() => setTab(item.key)}>
                {item.label}
              </S.SidebarLink>
            </S.SidebarItem>
          ))}
        </S.SidebarMenu>
      </S.Sidebar>
      <S.Main>
        <S.MainContent>
          {tab !== 'dashboard' && (
            <>
              <TopBar
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                setSelectedYear={setSelectedYear}
                setSelectedMonth={setSelectedMonth}
                yearRange={yearRange}
                monthRange={monthRange}
              />
              <TotalBox
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                totalNet={totalNet}
              />
            </>
          )}

          {tab === 'dashboard' && (
            <>
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
                <S.Button onClick={() => setTab('table')}>+ 수입/지출 내역 추가하기</S.Button>
              </div>
            </>
          )}
          {tab === 'table' && (
            <div style={{margin: '0 auto' }}>
              <RecordInput
                newRecord={newRecord}
                setNewRecord={setNewRecord}
                handleAddRecord={handleAddRecord}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
              />
              <RecordTable
                filteredRecords={filteredRecords}
                CATEGORIES={CATEGORIES}
                onEdit={handleEditRecord}
                onDelete={handleDeleteRecord}
              />
            </div>
          )}
          {tab === 'total-graph' && (
            <div style={{ margin: '0 auto' }}>
              <GraphBox
                title="수입/지출 그래프"
                color="#fff"
                data={totalGraphData}
                graphView={graphView}
                setGraphView={setGraphView}
                legend={true}
              />
              <GraphBox
                title="수입 그래프"
                color="#3ad29f"
                data={incomeGraphData}
                graphView={graphView}
                setGraphView={setGraphView}
                legend={false}
              />
              <GraphBox
                title="지출 그래프"
                color="#5b5fc7"
                data={expenseGraphData}
                graphView={graphView}
                setGraphView={setGraphView}
                legend={false}
              />
            </div>
          )}
        </S.MainContent>
      </S.Main>
    </S.Layout>
  );
}

export default App;
