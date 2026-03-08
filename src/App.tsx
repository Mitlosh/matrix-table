import { Table } from './components/Table/Table';
import { MatrixProvider } from './context/MatrixProvider';

function App() {
  return (
    <MatrixProvider>
      <main>
        <Table />
      </main>
    </MatrixProvider>
  );
}

export default App;
