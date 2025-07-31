import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { SpendingData } from '../../types';
import DataSourceBadge from '../common/DataSourceBadge';

interface USMapProps {
  spendingData: SpendingData[];
  onStateSelect?: (state: string | null) => void;
  selectedState?: string | null;
}

const USMap: React.FC<USMapProps> = ({ spendingData, onStateSelect, selectedState }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 975, height: 610 });
  const [usData, setUsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const getStateData = (stateName: string) => {
    return spendingData.find(state => state.state === stateName);
  };

  const getStateColor = (stateName: string) => {
    const stateData = getStateData(stateName);
    if (!stateData) return '#E5E7EB';
    
    const spending = stateData.totalSpending;
    if (spending >= 50000000) return '#7C3AED';
    if (spending >= 20000000) return '#A855F7';
    if (spending >= 10000000) return '#C084FC';
    if (spending >= 5000000) return '#DDD6FE';
    return '#F3F4F6';
  };

  const handleStateClick = (stateName: string) => {
    onStateSelect?.(selectedState === stateName ? null : stateName);
  };

  // Load real US TopoJSON data from reliable CDN
  useEffect(() => {
    const loadUSData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the reliable US Atlas from Mike Bostock
        const response = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-110m.json');
        
        if (!response.ok) {
          throw new Error(`Failed to load map data: ${response.status}`);
        }
        
        const topology = await response.json();
        setUsData(topology);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load US map data:', error);
        setError('Failed to load map data');
        setLoading(false);
      }
    };

    loadUSData();
  }, []);

  useEffect(() => {
    if (!svgRef.current || !usData || loading || error) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = dimensions.width;
    const height = dimensions.height;

    // Use Albers USA projection for accurate US representation
    const projection = d3.geoAlbersUsa()
      .scale(1300)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Convert TopoJSON to GeoJSON
    const states = feature(usData, usData.objects.states);

    // Create main group
    const g = svg.append("g");

    // Draw states
    const stateElements = g.selectAll(".state")
      .data(states.features)
      .enter()
      .append("path")
      .attr("class", "state")
      .attr("d", path as any)
      .attr("fill", (d: any) => getStateColor(d.properties.name))
      .attr("stroke", "#ffffff")
      .attr("stroke-width", (d: any) => selectedState === d.properties.name ? 3 : 1)
      .style("cursor", "pointer")
      .style("transition", "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)")
      .on("mouseover", function(_, d: any) {
        setHoveredState(d.properties.name);
        d3.select(this as any)
          .style("filter", "brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.2))")
          .attr("stroke-width", 2);
      })
      .on("mouseout", function(_, d: any) {
        setHoveredState(null);
        d3.select(this as any)
          .style("filter", "none")
          .attr("stroke-width", selectedState === d.properties.name ? 3 : 1);
      })
      .on("click", function(_, d: any) {
        handleStateClick(d.properties.name);
      });

    // Add interactive dots for better UX (currently unused but kept for future features)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const stateDots = g.selectAll(".state-dot")
      .data(states.features)
      .enter()
      .append("circle")
      .attr("class", "state-dot")
      .attr("cx", (d: any) => {
        const centroid = path.centroid(d);
        return centroid && !isNaN(centroid[0]) ? centroid[0] : 0;
      })
      .attr("cy", (d: any) => {
        const centroid = path.centroid(d);
        return centroid && !isNaN(centroid[1]) ? centroid[1] : 0;
      })
      .attr("r", (d: any) => {
        const stateData = getStateData(d.properties.name);
        if (!stateData) return 4;
        const maxSpending = Math.max(...spendingData.map(s => s.totalSpending));
        const minSize = 4;
        const maxSize = 15;
        const scale = (stateData.totalSpending / maxSpending);
        return minSize + (scale * (maxSize - minSize));
      })
      .attr("fill", (d: any) => {
        const baseColor = getStateColor(d.properties.name);
        return baseColor === '#E5E7EB' ? '#9CA3AF' : baseColor;
      })
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .style("transition", "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)")
      .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")
      .on("mouseover", function(event, d: any) {
        setHoveredState(d.properties.name);
        d3.select(this)
          .style("filter", "brightness(1.2) drop-shadow(0 4px 8px rgba(0,0,0,0.3))")
          .style("transform", "scale(1.3)")
          .style("transform-origin", "center");
      })
      .on("mouseout", function(event, d: any) {
        setHoveredState(null);
        d3.select(this)
          .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")
          .style("transform", "scale(1)");
      })
      .on("click", function(event, d: any) {
        handleStateClick(d.properties.name);
      });

    // Update selected state styling
    if (selectedState) {
      stateElements
        .filter((d: any) => d.properties.name === selectedState)
        .attr("stroke-width", 3)
        .attr("stroke", "#1F2937")
        .style("filter", "brightness(1.1) drop-shadow(0 4px 8px rgba(0,0,0,0.3))");
    }

  }, [spendingData, selectedState, dimensions, usData, loading, error]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const container = svgRef.current?.parentElement;
      if (container) {
        const containerWidth = container.clientWidth;
        const aspectRatio = 610 / 975;
        const width = Math.min(containerWidth, 975);
        const height = width * aspectRatio;
        setDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const hoveredStateData = hoveredState ? getStateData(hoveredState) : null;

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading US map...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">Failed to load map data</p>
            <p className="text-gray-600 dark:text-gray-400">Please check your internet connection</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-3d dark:shadow-dark-3d transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Interactive US Spending Map</h2>
          <DataSourceBadge source="USASpending.gov" />
        </div>
      </div>

      <div className="relative">
        {/* SVG Map */}
        <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-700">
          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            className="w-full h-auto"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        {/* Hover Tooltip */}
        {hoveredStateData && hoveredState && (
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-3d-hover dark:shadow-dark-3d-hover border border-gray-200 dark:border-gray-600 min-w-[280px] animate-float z-10">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">{hoveredState}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300 font-medium">Total Spending:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(hoveredStateData.totalSpending)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300 font-medium">Contracts:</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {hoveredStateData.contractCount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300 font-medium">Avg Award:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {formatCurrency(hoveredStateData.averageAward)}
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">Top Agencies:</p>
                <div className="flex flex-wrap gap-1">
                  {hoveredStateData.topAgencies.slice(0, 3).map((agency) => (
                    <span key={agency} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-xs rounded-full font-medium">
                      {agency.length > 15 ? `${agency.substring(0, 15)}...` : agency}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 italic border-t border-gray-100 dark:border-gray-700 pt-2">
                💡 Click to view detailed analysis in pie chart
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <div className="text-center mb-3">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Federal Spending Levels</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Click states or dots to explore detailed data</p>
        </div>
        <div className="flex items-center justify-center space-x-4 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-purple-600 shadow-3d dark:shadow-dark-3d"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">$50M+</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-purple-400 shadow-3d dark:shadow-dark-3d"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">$20M+</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-purple-300 shadow-3d dark:shadow-dark-3d"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">$10M+</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-purple-200 shadow-3d dark:shadow-dark-3d"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">$5M+</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-500 shadow-3d dark:shadow-dark-3d"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Under $5M</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USMap;