
import React, { useState } from 'react';
import { Search, Filter, X, Menu, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    status: '',
    date: ''
  });

  const categories = ['All Categories', 'Assignments', 'Reports', 'Submissions', 'Grades'];
  const statuses = ['All Status', 'Pending', 'Completed', 'In Review', 'Failed'];
  const dateRanges = ['All Time', 'Today', 'This Week', 'This Month', 'Custom'];

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: '',
      status: '',
      date: ''
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-purple-600 to-indigo-600">
              <span className="text-xl font-bold text-white">A</span>
            </div>
            <span className="text-xl font-semibold text-white">Datox</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {/* Search Bar */}
            <div className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 rounded-lg border border-gray-700 bg-gray-900/50 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2 text-sm font-medium text-white transition-all hover:border-indigo-500 hover:bg-gray-800"
            >
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Action Buttons */}
            <button className="rounded-full bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/50">
              Subscribe
            </button>
          </div>

        
        </div>

        {/* Filter Dropdown Panel */}
        {isFilterOpen && (
          <div className="absolute left-0 right-0 top-20 border-b border-gray-800 bg-black/95 backdrop-blur-sm shadow-xl">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Category Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">
                    Category
                  </label>
                  <select
                    value={selectedFilters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2 text-sm text-white outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">
                    Status
                  </label>
                  <select
                    value={selectedFilters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2 text-sm text-white outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-400">
                    Date Range
                  </label>
                  <select
                    value={selectedFilters.date}
                    onChange={(e) => handleFilterChange('date', e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2 text-sm text-white outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  >
                    {dateRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={clearFilters}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/50"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
