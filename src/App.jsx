import React from 'react';
// 스타일 컴포넌트 임포트
import * as S from './styled';
// 상단 바 컴포넌트
import TopBar from './components/TopBar/TopBar';
// 총 수입/지출/합계 박스
import TotalBox from './components/TotalBox/TotalBox';
// 수입/지출 내역 입력 폼
import RecordInput from './components/RecordInput/RecordInput';
// 수입/지출 내역 테이블
import RecordTable from './components/RecordTable/RecordTable';
// 그래프 시각화 박스
import GraphBox from './components/GraphBox/GraphBox';
// 가계부 데이터 상태 및 로직 훅
import { useAccountBook } from './hooks/useAccountBook';
// 대시보드 요약 컴포넌트
import DashboardSummary from './components/DashboardSummary/DashboardSummary';
// 연도별 그래프 컴포넌트
import YearlyGraph from './components/YearlyGraph/YearlyGraph';
// 대시보드 하단 테이블
import DashboardTable from './components/DashboardTable/DashboardTable';
// Chart.js 등록 (그래프 그리기용)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
// 차트 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// 수입/지출 카테고리 매핑 객체
const CATEGORIES = {
  INCOME: '수입',
  EXPENSE: '지출',
};

function App() {
  // useAccountBook 훅에서 모든 상태와 핸들러 불러오기
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

  // 실제 UI 렌더링
  return (
    <S.Layout> {/* 전체 레이아웃 */}
      <S.Sidebar> {/* 사이드바 */}
        <S.SidebarLogo>
          당신의 <span style={{color:'#5b5fc7'}}>하우스 헬퍼</span>
        </S.SidebarLogo>
        <S.SidebarMenu> {/* 메뉴 목록 */}
          {NAV_ITEMS.map(item => (
            <S.SidebarItem key={item.key}>
              <S.SidebarLink $active={tab === item.key} onClick={() => setTab(item.key)}>
                {item.label}
              </S.SidebarLink>
            </S.SidebarItem>
          ))}
        </S.SidebarMenu>
      </S.Sidebar>
      <S.Main> {/* 메인 영역 */}
        <S.MainContent>
          {/* 대시보드 외의 탭일 때만 상단바 및 총합 박스 보여줌 */}
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

          {/* 대시보드 탭일 경우 */}
          {tab === 'dashboard' && (
            <>
              {/* 연도 선택 드롭다운 */}
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

              {/* 선택된 연도에 대한 요약 박스 */}
              <DashboardSummary
                year={dashboardYear}
                income={getYearSummary(dashboardYear).income}
                expense={getYearSummary(dashboardYear).expense}
                net={getYearSummary(dashboardYear).net}
              />

              {/* 연도별 총합 테이블 */}
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

              {/* 연도별 수입/지출 그래프 */}
              <YearlyGraph data={totalGraphData} />

              {/* 해당 연도 + 이번 달 내역만 필터링해서 테이블로 출력 */}
              <DashboardTable
                records={records.filter(r =>
                  r.date &&
                  new Date(r.date).getFullYear() === dashboardYear &&
                  new Date(r.date).getMonth() + 1 === new Date().getMonth() + 1
                )}
                CATEGORIES={CATEGORIES}
              />

              {/* 내역 추가 버튼 */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5em' }}>
                <S.Button onClick={() => setTab('table')}>+ 수입/지출 내역 추가하기</S.Button>
              </div>
            </>
          )}

          {/* 내역 탭일 경우 */}
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

          {/* 그래프 탭일 경우 */}
          {tab === 'total-graph' && (
            <div style={{ margin: '0 auto' }}>
              {/* 총합 그래프 */}
              <GraphBox
                title="수입/지출 그래프"
                color="#fff"
                data={totalGraphData}
                graphView={graphView}
                setGraphView={setGraphView}
                legend={true}
              />
              {/* 수입 그래프 */}
              <GraphBox
                title="수입 그래프"
                color="#3ad29f"
                data={incomeGraphData}
                graphView={graphView}
                setGraphView={setGraphView}
                legend={false}
              />
              {/* 지출 그래프 */}
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
