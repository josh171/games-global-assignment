import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import Automation from './components/Automation';
import automationsJSON from './components/data.json';
import Filters from './components/Filters';

function App() {
  const [allAutomations] = useState(automationsJSON.data.oneClickAutomations.items);
  const [automations, setAutomations] = useState(allAutomations);
  const [filter, setFilter] = useState('');

  const filterAutomations = useCallback(() => {
    return allAutomations.filter(
      (automation) =>
        automation.slug.toLowerCase().includes(filter.toLowerCase()) ||
        automation.shortDescription.toLowerCase().includes(filter.toLowerCase())
    );
  }, [allAutomations, filter]);

  useEffect(() => {
    const filteredBySlug = filterAutomations();
    setAutomations(filteredBySlug);
  }, [filter, filterAutomations]);

  return (
    <div className="app-container">
      <Filters filter={filter} setFilter={setFilter} />
      <div className="automations">
        {automations.length ? (
          automations.map((automation) => (
            <Automation key={automation.id} automation={automation} setFilter={setFilter} />
          ))
        ) : (
          <div>No automations found based off filter, please try again.</div>
        )}
      </div>
    </div>
  );
}

export default App;
