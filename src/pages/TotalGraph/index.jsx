import GraphBox from '../../components/GraphBox';
import * as S from './styled';
import { useTotalGraph } from '../../hooks/useTotalGraph';

function TotalGraph() {
  const { totalGraphData, incomeGraphData, expenseGraphData, graphView, setGraphView } = useTotalGraph();

  return (
    <S.TotalGraphWrapper>
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
    </S.TotalGraphWrapper>
  );
}

export default TotalGraph;
