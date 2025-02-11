import React from 'react';
import './App.scss';
import TitleEditor from './components/TitleEditor';
import ProposalOverview from './components/ProposalOverview';
import Deliverables from './components/Deliverables';
import ModuleEditor from './components/ModuleEditor/ModuleEditor';
import ExportButtons from './components/ExportButtons';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <TitleEditor />
        <ProposalOverview />
        <Deliverables />
        <ModuleEditor />
        <ExportButtons />
      </div>
    </Provider>
  );
};

export default App;
