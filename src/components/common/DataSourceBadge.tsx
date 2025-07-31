import React from 'react';
import { Database, ExternalLink } from 'lucide-react';

interface DataSourceBadgeProps {
  source: 'SAM.gov' | 'USASpending.gov';
  className?: string;
}

const DataSourceBadge: React.FC<DataSourceBadgeProps> = ({ source, className = '' }) => {
  const getSourceConfig = (source: string) => {
    switch (source) {
      case 'SAM.gov':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Database,
          url: 'https://sam.gov'
        };
      case 'USASpending.gov':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: ExternalLink,
          url: 'https://usaspending.gov'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Database,
          url: '#'
        };
    }
  };

  const config = getSourceConfig(source);
  const Icon = config.icon;

  return (
    <a
      href={config.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border transition-all duration-300 hover:opacity-80 hover:scale-105 hover:shadow-md group ${config.color} ${className}`}
      title={`Data sourced from ${source}`}
    >
      <Icon className="w-3 h-3 mr-1 group-hover:rotate-12 transition-transform duration-300" />
      {source}
    </a>
  );
};

export default DataSourceBadge;