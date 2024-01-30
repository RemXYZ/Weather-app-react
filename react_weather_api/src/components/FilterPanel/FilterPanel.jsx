import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { setFilters } from '../../redux/actions/filterActions'; 

const FilterPanel = () => {
  const dispatch = useDispatch();
  const [nameFilter, setNameFilter] = useState('');
  const [populationFilter, setPopulationFilter] = useState(0);
  const weatherData = useSelector(state => state.weather.weatherData); // Access weather data from the store
  // console.log(weatherData);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNameFilter(value);
    dispatch(setFilters({ name: value }));
  };

  const handlePopulationChange = (e) => {
    const value = e.target.value;
    setPopulationFilter(value);
    dispatch(setFilters({ minPopulation: Number(value) }));
  };

  return (
    <div className="filter-panel">


      <input 
        type="text"
        list="city-names" 
        name="browser"
        value={nameFilter}
        onChange={handleNameChange}
        placeholder="Search by city name..."
      />
      <datalist id="city-names">
        {weatherData.map(city => (
          <option key={city.id} value={city.cityName} />
        ))}
      </datalist>


      <input
        type="range"
        min="0"
        max="10000000"
        value={populationFilter}
        onChange={handlePopulationChange}
      />
      <div>Min Population: {populationFilter}</div>
    </div>
  );
};

export default FilterPanel;
