import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LabelList } from 'recharts';
import { ZoomIn, ZoomOut, Info } from 'lucide-react';
import { SpendingData } from '../../types';
import DataSourceBadge from '../common/DataSourceBadge';

interface EnhancedSpendingChartProps {
  spendingData: SpendingData[];
  onStateSelect?: (state: string | null) => void;
  selectedState?: string | null;
}

const EnhancedSpendingChart: React.FC<EnhancedSpendingChartProps> = ({
  spendingData,
  onStateSelect,
  selectedState
}) => {
  const [scale, setScale] = useState(1);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const topStates = [...spendingData]
    .sort((a, b) => b.totalSpending - a.totalSpending)
    .slice(0, 8);

  const pieData = topStates.map((state, index) => ({
    name: state.state,
    value: state.totalSpending,
    contractCount: state.contractCount,
    averageAward: state.averageAward,
    topAgencies: state.topAgencies,
    color: [
      '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', 
      '#EF4444', '#EC4899', '#8B5A2B', '#6B7280'
    ][index]
  }));

  const totalSpending = pieData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 border border-gray-600 dark:border-gray-600 rounded-lg shadow-xl max-w-xs">
          <h3 className="font-semibold text-white mb-2">{data.name}</h3>
          <div className="space-y-1 text-sm">
            <p className="text-gray-200">
              <span className="font-medium">Total Spending:</span> {formatCurrency(data.value)}
            </p>
            <p className="text-gray-200">
              <span className="font-medium">Contracts:</span> {data.contractCount.toLocaleString()}
            </p>
            <p className="text-gray-200">
              <span className="font-medium">Avg Award:</span> {formatCurrency(data.averageAward)}
            </p>
            <p className="text-gray-200">
              <span className="font-medium">Share:</span> {((data.value / totalSpending) * 100).toFixed(1)}%
            </p>
            <div className="mt-2 pt-2 border-t border-gray-600">
              <p className="text-xs text-gray-300 font-medium mb-1">Top Agencies:</p>
              <div className="flex flex-wrap gap-1">
                {data.topAgencies.slice(0, 2).map((agency: string) => (
                  <span key={agency} className="px-2 py-1 bg-gray-700 text-gray-200 text-xs rounded">
                    {agency}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const handlePieClick = (data: any) => {
    const stateName = data.name;
    onStateSelect?.(selectedState === stateName ? null : stateName);
  };

  const selectedStateData = selectedState ? 
    spendingData.find(state => state.state === selectedState) : null;

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const data = pieData[index];

    return (
      <g>
        {/* Connection line from pie slice to label */}
        <line
          x1={cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN)}
          y1={cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN)}
          x2={x}
          y2={y}
          stroke={data.color}
          strokeWidth={1.5}
          strokeDasharray="2,2"
          opacity={0.7}
        />
        {/* Label background circle */}
        <circle
          cx={x}
          cy={y}
          r={8}
          fill="white"
          stroke={data.color}
          strokeWidth={2}
          opacity={0.9}
        />
        {/* State abbreviation in circle */}
        <circle
          cx={x}
          cy={y}
          r={3}
          fill={data.color}
        />
        {/* State name label */}
        <text
          x={x + (x > cx ? 10 : -10)}
          y={y}
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          className="fill-gray-700 dark:fill-gray-300 text-sm font-semibold"
        >
          {data.name}
        </text>
        {/* Spending amount label */}
        <text
          x={x + (x > cx ? 10 : -10)}
          y={y + 12}
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          className="fill-purple-600 dark:fill-purple-400 text-xs font-medium"
        >
          {formatCurrency(value)}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top Federal Spending by State</h2>
          <DataSourceBadge source="USASpending.gov" />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing top 8 states by contract value
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setScale(Math.max(0.5, scale - 0.1))}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale(Math.min(2, scale + 0.1))}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="relative">
          <ResponsiveContainer width="100%" height={500 * scale}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={140 * scale}
                innerRadius={50 * scale}
                dataKey="value"
                onClick={handlePieClick}
                className="cursor-pointer transition-all duration-300"
                animationBegin={0}
                animationDuration={1000}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke={selectedState === entry.name ? '#374151' : '#ffffff'}
                    strokeWidth={selectedState === entry.name ? 4 : 2}
                    className="transition-all duration-300 hover:brightness-110 hover:drop-shadow-lg cursor-pointer"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }}
                  />
                ))}
                <LabelList content={<CustomLabel />} />
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Legend with connecting lines */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full shadow-sm" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {entry.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatCurrency(entry.value)}
                </span>
              </div>
            ))}
          </div>
          
          {hoveredState && (
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-lg border border-gray-200 dark:border-gray-600 shadow-3d dark:shadow-dark-3d animate-float">
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <Info className="w-4 h-4 mr-1" />
                Hover for details, click to select
              </div>
            </div>
          )}
        </div>

        {/* State Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {selectedState ? `${selectedState} Contract Details` : 'Select a State for Details'}
          </h3>
          
          {selectedStateData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-200">
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Total Spending</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {formatCurrency(selectedStateData.totalSpending)}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-200">
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Contracts</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {selectedStateData.contractCount.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-200">
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">Average Award</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {formatCurrency(selectedStateData.averageAward)}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Top Agencies</p>
                <div className="space-y-2">
                  {selectedStateData.topAgencies.map((agency, index) => (
                    <div key={agency} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-200">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{agency}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">#{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Info className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600 animate-bounce-gentle" />
              <p>Click on a pie slice to view detailed information about that state's federal spending.</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalSpending)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Displayed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{pieData.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">States Shown</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalSpending / pieData.reduce((sum, item) => sum + item.contractCount, 0))}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Contract Value</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSpendingChart;