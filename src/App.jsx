import React, { useState } from 'react';
import * as S from './styled';
import TopBar from './components/TopBar';
import TotalBox from './components/TotalBox';
import RecordInput from './components/RecordInput';
import RecordTable from './components/RecordTable';
import GraphBox from './components/GraphBox';
import { useAccountBook } from './hooks/useAccountBook';
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
  INCOME: '입금',
  EXPENSE: '지출',
};

function App() {
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const yearRange = Array.from({ length: 10 }, (_, i) => now.getFullYear() - 5 + i);
  const monthRange = Array.from({ length: 12 }, (_, i) => i + 1);
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ category: 'EXPENSE', amount: '', description: '', date: '' });
  const [tab, setTab] = useState('table');
  const [graphView, setGraphView] = useState('year');

  const {
    filteredRecords,
    totalIncome,
    totalExpense,
    totalNet,
    incomeGraphData,
    expenseGraphData,
    totalGraphData,
  } = useAccountBook(records, selectedYear, selectedMonth, graphView);

  const NAV_ITEMS = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'table', label: '수입/지출 내역' },
    { key: 'total-graph', label: '수입/지출 그래프' },
  ]; 

  // 내역 추가
  const handleAddRecord = () => {
    if (!newRecord.amount || !newRecord.date) return;
    setRecords(prev => [...prev, { ...newRecord, amount: Number(newRecord.amount) }]);
    setNewRecord({ category: 'EXPENSE', amount: '', description: '', date: '' });
  };

  // 네비게이션 클릭 시 탭 변경
  const handleNav = (key) => {
    if (key === 'dashboard') return;
    setTab(key);
  };

  return (
    <S.Layout>
      <S.Sidebar>
        <S.SidebarLogo>당신의 <span style={{color:'#5b5fc7'}}>하우스 헬퍼</span></S.SidebarLogo>
        <S.SidebarMenu>
          {NAV_ITEMS.map(item => (
            <S.SidebarItem key={item.key}>
              <S.SidebarLink $active={tab===item.key} onClick={()=>handleNav(item.key)}>
                {item.label}
              </S.SidebarLink>
            </S.SidebarItem>
          ))}
        </S.SidebarMenu>
      </S.Sidebar>
      <S.Main>
        <S.MainContent>
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
          {tab === 'table' && (
            <div style={{width:'100%',maxWidth:'700px',margin:'0 auto'}}>
              <RecordInput
                newRecord={newRecord}
                setNewRecord={setNewRecord}
                handleAddRecord={handleAddRecord}
              />
              <RecordTable
                filteredRecords={filteredRecords}
                CATEGORIES={CATEGORIES}
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                totalNet={totalNet}
              />
            </div>
          )}
          {tab === 'total-graph' && (
            <div style={{width:'100%',maxWidth:'700px',margin:'0 auto'}}>
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
