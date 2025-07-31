import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { SpendingData } from '../../types';

interface USMapInteractiveProps {
  spendingData: SpendingData[];
  onStateClick?: (state: SpendingData) => void;
}

interface TooltipData {
  state: SpendingData;
  x: number;
  y: number;
}

const USMapInteractive: React.FC<USMapInteractiveProps> = ({ spendingData, onStateClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [mapData, setMapData] = useState<any>(null);

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

  // Load map data
  useEffect(() => {
    const loadMapData = async () => {
      try {
        const response = await fetch('/src/data/us-110m.json');
        const topology = await response.json();
        setMapData(topology);
      } catch (error) {
        console.error('Error loading map data:', error);
      }
    };
    loadMapData();
  }, []);

  // Create color scale
  const colorScale = d3.scaleSequential(d3.interpolateBlues)
    .domain([0, d3.max(spendingData, d => d.totalSpending) || 0]);

  // Get spending data for a state
  const getStateData = (stateName: string): SpendingData | undefined => {
    return spendingData.find(s => 
      s.state.toLowerCase() === stateName.toLowerCase() ||
      s.state === stateName
    );
  };

  useEffect(() => {
    if (!mapData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 960;
    const height = 500;

    svg.attr('width', width).attr('height', height);

    // Create projection
    const projection = d3.geoAlbersUsa()
      .scale(1200)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Convert topology to features
    const states = feature(mapData, mapData.objects.states);

    // Create map group
    const mapGroup = svg.append('g');

    // Draw states
    mapGroup.selectAll('path')
      .data(states.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', 'state-path')
      .attr('fill', (d: any) => {
        const stateData = getStateData(d.properties.name);
        return stateData ? colorScale(stateData.totalSpending) : '#f0f0f0';
      })
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d: any) {
        const stateData = getStateData(d.properties.name);
        if (stateData) {
          // Highlight state
          d3.select(this)
            .attr('stroke-width', 2)
            .attr('stroke', '#4f46e5')
            .style('filter', 'brightness(1.1)');

          // Show tooltip
          setTooltip({
            state: stateData,
            x: event.pageX,
            y: event.pageY
          });
        }
      })
      .on('mousemove', function(event) {
        if (tooltip) {
          setTooltip(prev => prev ? {
            ...prev,
            x: event.pageX,
            y: event.pageY
          } : null);
        }
      })
      .on('mouseout', function() {
        // Remove highlight
        d3.select(this)
          .attr('stroke-width', 1)
          .attr('stroke', '#ffffff')
          .style('filter', 'none');

        // Hide tooltip
        setTooltip(null);
      })
      .on('click', function(event, d: any) {
        const stateData = getStateData(d.properties.name);
        if (stateData && onStateClick) {
          onStateClick(stateData);
        }
      });

    // Add state labels for major states
    mapGroup.selectAll('.state-label')
      .data(states.features)
      .enter()
      .append('text')
      .attr('class', 'state-label')
      .attr('transform', (d: any) => {
        const centroid = path.centroid(d);
        return `translate(${centroid[0]}, ${centroid[1]})`;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .style('pointer-events', 'none')
      .text((d: any) => {
        // Only show abbreviations for larger states
        const stateAbbr: { [key: string]: string } = {
          'California': 'CA', 'Texas': 'TX', 'Florida': 'FL', 'New York': 'NY',
          'Pennsylvania': 'PA', 'Illinois': 'IL', 'Ohio': 'OH', 'Georgia': 'GA',
          'North Carolina': 'NC', 'Michigan': 'MI', 'New Jersey': 'NJ', 'Virginia': 'VA',
          'Washington': 'WA', 'Arizona': 'AZ', 'Massachusetts': 'MA', 'Tennessee': 'TN',
          'Indiana': 'IN', 'Maryland': 'MD', 'Missouri': 'MO', 'Wisconsin': 'WI'
        };
        return stateAbbr[d.properties.name] || '';
      });

  }, [mapData, spendingData, colorScale]);

  return (
    <div className="relative">
      <svg ref={svgRef} className="w-full h-auto bg-gray-50 dark:bg-gray-900 rounded-lg"></svg>
      
      {/* Tooltip */}
      {tooltip && (
        <div 
          className="fixed z-50 pointer-events-none"
          style={{ 
            left: tooltip.x + 10, 
            top: tooltip.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="bg-gray-900/95 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-gray-600 max-w-xs">
            <h3 className="font-semibold text-white mb-2">{tooltip.state.state}</h3>
            <div className="space-y-1 text-sm">
              <p className="text-gray-200">
                <span className="font-medium">Total Spending:</span> {formatCurrency(tooltip.state.totalSpending)}
              </p>
              <p className="text-gray-200">
                <span className="font-medium">Contracts:</span> {tooltip.state.contractCount.toLocaleString()}
              </p>
              <p className="text-gray-200">
                <span className="font-medium">Avg Award:</span> {formatCurrency(tooltip.state.averageAward)}
              </p>
              <p className="text-gray-200">
                <span className="font-medium">Top Agencies:</span>
              </p>
              <ul className="text-xs text-gray-300 ml-2">
                {tooltip.state.topAgencies.slice(0, 3).map((agency, idx) => (
                  <li key={idx}>• {agency}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-600">
              <p className="text-purple-400 text-xs font-medium">
                💡 Click to explore detailed data
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Federal Spending</h4>
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-2 bg-blue-200"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Low</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <div className="w-4 h-2 bg-blue-800"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">High</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Max: {formatCurrency(d3.max(spendingData, d => d.totalSpending) || 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USMapInteractive;
