import RecordInput from '../../components/RecordInput';
import RecordTable from '../../components/RecordTable';
import * as S from './styled';
import { useTable } from '../../hooks/useTable';

function Table() {
  const {
    newRecord, setNewRecord, handleAddRecord,
    selectedYear, selectedMonth,
    filteredRecords, handleEditRecord, handleDeleteRecord, CATEGORIES
  } = useTable();

  return (
    <S.TablePageWrapper>
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
