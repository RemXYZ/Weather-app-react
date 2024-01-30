import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const ChartsPanel = () => {
  const weatherData = useSelector(state => state.weather.weatherData);

  // Process weather data for charting
  const chartData = weatherData.map(city => {
    const niceness = city.temperature >= 18 && city.temperature <= 25 && city.condition !== 'Rain' ? 'Nice' : 'Not Nice';
    // console.log(city, niceness)
    return {
      name: city.cityName,
      temperature: city.temperature,
      pressure: city.pressure / 10,
      niceness: niceness === 'Nice' ? 100 : 0,
    };
  });

  // Determine the min and max for temperature and pressure
  const tempValues = chartData.map(data => data.temperature);
  const pressureValues = chartData.map(data => data.pressure);
  const temperatureDomain = [Math.min(...tempValues) * 0.95, Math.max(...tempValues) * 1.05];
  const pressureDomain = [Math.min(...pressureValues) * 0.95, Math.max(...pressureValues) * 1.05];

  const formatTick = (tick) => {
    return tick.toFixed(1); // Rounds the number to 2 decimal places
  };

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const style = {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '5px 10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        color: '#000',
      };
      return (
        <div className="custom-tooltip" style={style}>
          <p className="label">{`${label}`}</p> {/* Label is the city name */}
          <p className="intro">{`Temperature: ${payload[0].value}`}</p>
          <p className="intro">{`Pressure: ${payload[1].value.toFixed(1)}`}</p>
          <p className="intro">{`Niceness: ${payload[2].value}`}</p>
        </div>
      );
    }
  };

  return (
    <div className="charts-panel">
      <ResponsiveContainer width={600} height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" domain={temperatureDomain} tickFormatter={formatTick}>
            <Label angle={270} position='insideLeft' style={{ textAnchor: 'middle' }}>Temperature and Niceness</Label>
          </YAxis>
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={pressureDomain} tickFormatter={formatTick}>
            <Label angle={90} position='insideRight' style={{ textAnchor: 'middle' }}>Pressure/10</Label>
          </YAxis>
          <Tooltip content={customTooltip} />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="pressure" stroke="#82ca9d" activeDot={{ r: 8 }} />
          <Line yAxisId="left" type="monotone" dataKey="niceness" stroke="#ffc658" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartsPanel;
