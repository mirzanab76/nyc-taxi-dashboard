import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Filters = ({ filters, onFilterChange }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateRangeChange = (ranges) => {
    onFilterChange({
      ...filters,
      dateRange: [ranges.selection.startDate, ranges.selection.endDate]
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-6">
      <h2 className="text-lg font-semibold">Filters</h2>
      
      {/* Date Range Filter */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date Range
        </label>
        
        {/* Date Display Button */}
        <button
          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          className="w-full px-4 py-2 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {filters.dateRange[0]?.toLocaleDateString()} - {filters.dateRange[1]?.toLocaleDateString()}
        </button>

        {/* Date Picker Container */}
        {isDatePickerOpen && (
          <div className="absolute left-0 mt-2 z-50 bg-white rounded-lg shadow-xl">
            <div className="relative">
              <DateRangePicker
                ranges={[{
                  startDate: filters.dateRange[0] || new Date(),
                  endDate: filters.dateRange[1] || new Date(),
                  key: 'selection'
                }]}
                onChange={handleDateRangeChange}
                months={1}
                direction="vertical"
              />
              {/* Close button */}
              <button
                onClick={() => setIsDatePickerOpen(false)}
                className="absolute top-2 right-2 bg-gray-100 rounded-full p-1 hover:bg-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fare Range ($)
        </label>
        <div className="relative pt-1">
          <input
            type="range"
            min="0"
            max="100"
            value={filters.fareRange[1]}
            onChange={(e) => onFilterChange({
              ...filters,
              fareRange: [0, parseInt(e.target.value)]
            })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>$0</span>
            <span>${filters.fareRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Distance Range (miles)
        </label>
        <div className="relative pt-1">
          <input
            type="range"
            min="0"
            max="50"
            value={filters.distanceRange[1]}
            onChange={(e) => onFilterChange({
              ...filters,
              distanceRange: [0, parseInt(e.target.value)]
            })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>0 mi</span>
            <span>{filters.distanceRange[1]} mi</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Type
        </label>
        <select
          value={filters.paymentType}
          onChange={(e) => onFilterChange({
            ...filters,
            paymentType: e.target.value
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="CASH">Cash</option>
          <option value="CREDIT">Credit Card</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;