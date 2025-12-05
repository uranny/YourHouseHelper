import RecordInput from '../../components/RecordInput';
import RecordTable from '../../components/RecordTable';
import { useTable } from '../../hooks/useTable';
import * as S from './styled';

function Table() {
  const {
    newRecord, setNewRecord, handleAddRecord,
    selectedYear, selectedMonth, setSelectedYear, setSelectedMonth,
    filteredRecords, handleEditRecord, handleDeleteRecord, CATEGORIES
  } = useTable();

  return (
    <S.TablePageWrapper>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1em', marginBottom: '1em' }}>
        <label htmlFor="table-year-select" style={{ color: '#fff', fontWeight: 500 }}>연도 선택:</label>
        <select
          id="table-year-select"
          value={selectedYear}
          onChange={e => setSelectedYear(Number(e.target.value))}
          style={{ background: '#23263a', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5em 1em', fontSize: '1em' }}
        >
          {Array.from({ length: 10 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return <option key={y} value={y}>{y}년</option>;
          })}
        </select>
        <label htmlFor="table-month-select" style={{ color: '#fff', fontWeight: 500 }}>월 선택:</label>
        <select
          id="table-month-select"
          value={selectedMonth}
          onChange={e => setSelectedMonth(Number(e.target.value))}
          style={{ background: '#23263a', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5em 1em', fontSize: '1em' }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}월</option>
          ))}
        </select>
      </div>
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
    </S.TablePageWrapper>
  );
}

export default Table;
