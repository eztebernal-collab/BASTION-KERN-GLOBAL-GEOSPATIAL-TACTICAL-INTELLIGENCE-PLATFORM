import React, { useEffect, useRef, memo } from 'react';
import * as d3 from 'd3';

const HistoricalTrendsChart = memo(function HistoricalTrendsChart() {
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

    const width = chartRef.current.clientWidth || 300;
    const height = 220;
    const margin = { top: 20, right: 10, bottom: 25, left: 25 };

    const data = [
      { time: '00:00', critical: 2, high: 15, medium: 45 },
      { time: '04:00', critical: 5, high: 20, medium: 40 },
      { time: '08:00', critical: 10, high: 25, medium: 60 },
      { time: '12:00', critical: 15, high: 35, medium: 75 },
      { time: '16:00', critical: 8, high: 28, medium: 65 },
      { time: '20:00', critical: 4, high: 18, medium: 50 },
      { time: '24:00', critical: 3, high: 12, medium: 40 },
    ];

    const x = d3.scalePoint()
      .domain(data.map(d => d.time))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

    const categories = [
      { key: 'medium', color: '#3B82F6', label: 'MEDIO' },
      { key: 'high', color: '#F59E0B', label: 'ALTO' },
      { key: 'critical', color: '#EF4444', label: 'CRÍTICO' }
    ];

    const defs = svg.append('defs');

    categories.forEach(cat => {
      const gradient = defs.append('linearGradient')
        .attr('id', `gradient-${cat.key}`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');
      
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', cat.color)
        .attr('stop-opacity', 0.4);
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', cat.color)
        .attr('stop-opacity', 0.0);
    });

    categories.forEach(cat => {
      const area = d3.area<any>()
        .x(d => x(d.time)!)
        .y0(height - margin.bottom)
        .y1(d => y(d[cat.key as 'critical' | 'high' | 'medium']))
        .curve(d3.curveMonotoneX);

      const line = d3.line<any>()
        .x(d => x(d.time)!)
        .y(d => y(d[cat.key as 'critical' | 'high' | 'medium']))
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(data)
        .attr('fill', `url(#gradient-${cat.key})`)
        .attr('d', area);

      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', cat.color)
        .attr('stroke-width', 2)
        .attr('d', line);

      svg.selectAll(`.dot-${cat.key}`)
        .data(data)
        .enter()
        .append('circle')
        .attr('class', `dot-${cat.key}`)
        .attr('cx', d => x(d.time)!)
        .attr('cy', d => y(d[cat.key as 'critical' | 'high' | 'medium']))
        .attr('r', 3)
        .attr('fill', '#0B0D12')
        .attr('stroke', cat.color)
        .attr('stroke-width', 2);
    });

    // X-axis
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSize(0).tickPadding(8))
      .attr('color', '#6B7280')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-sans)')
      .select('.domain').remove();

    // Y-axis
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5).tickSize(0).tickPadding(8))
      .attr('color', '#4B5563')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-sans)')
      .select('.domain').remove();
      
    // Grid lines
    svg.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(y.ticks(5))
      .enter()
      .append('line')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', d => y(d))
      .attr('y2', d => y(d))
      .attr('stroke', '#ffffff')
      .attr('stroke-opacity', 0.05)
      .attr('stroke-dasharray', '3,3');

  }, []);

  return (
    <div className="mt-8 mb-4">
      <div className="text-xs text-gray-400 tracking-wider font-semibold mb-3">RISK FACTOR DISTRIBUTION & TRENDS</div>
      <div className="bg-[#1A1D24]/50 border border-white/5 rounded-2xl p-4 shadow-lg">
        <svg ref={chartRef} className="w-full h-[220px]" />
        
        {/* Legend */}
        <div className="flex justify-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"/> 
            <span className="text-[10px] text-gray-300 font-medium tracking-wide">CRÍTICO</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"/> 
            <span className="text-[10px] text-gray-300 font-medium tracking-wide">ALTO</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"/> 
            <span className="text-[10px] text-gray-300 font-medium tracking-wide">MEDIO</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HistoricalTrendsChart;
