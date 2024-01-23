import { useEffect, useState } from 'react';
import './App.scss';
import Automation from './components/Automation';
import automationsJSON from './components/data.json';
import Filters from './components/Filters';

// Default filter options, easier to reset to initial values

export const defaultFilters = {
  extract: '',
  monitoring: '',
  filterBySite: [],
  filterByCategory: ''
};

// To render filter options and it's filtered automations
function App() {
  const allAutomations = automationsJSON.data.oneClickAutomations.items;

  const [automations, setAutomations] = useState(allAutomations);
  const [filters, setFilters] = useState(defaultFilters);

  // Funtion to filter through automations
  const filterAutomations = () => {
    return allAutomations.filter((automation) => {
      const matchesExtract = automation.slug.includes(filters.extract);

      const matchesMonitoring = automation.slug.includes(filters.monitoring);

      const matchesSite =
        filters.filterBySite.length === 0 ||
        automation.sites.some((site) => filters.filterBySite.includes(site.title));

      const matchesCategory =
        filters.filterByCategory.length === 0 ||
        automation.categories.some((category) => category.title === filters.filterByCategory);

      return matchesExtract && matchesMonitoring && matchesSite && matchesCategory;
    });
  };

  // Use effect to check for any filter changes, if so then filter and return the corresponding data
  useEffect(() => {
    const filteredAutomations = filterAutomations();
    setAutomations(filteredAutomations);
  }, [filters, allAutomations]);

  return (
    <div className="app-container">
      <Filters filters={filters} setFilters={setFilters} allAutomations={allAutomations} />

      <div className="automations">
        {automations.length ? (
          automations.map((automation) => (
            <Automation key={automation.id} automation={automation} />
          ))
        ) : (
          <div className="no-automations-found-container">
            No automations found based off your filter, please try again.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
