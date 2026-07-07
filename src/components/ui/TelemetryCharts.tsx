import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function TelemetryCharts() {
  const lineChartRef = useRef<SVGSVGElement>(null);
  const pieChartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Render Line Chart
    if (lineChartRef.current) {
      const svg = d3.select(lineChartRef.current);
      svg.selectAll('*').remove();
      
      const width = lineChartRef.current.clientWidth || 300;
      const height = 180;
      const margin = { top: 10, right: 10, bottom: 20, left: 10 };

      const data = [
        { time: '00:00', value: 20 },
        { time: '04:00', value: 35 },
        { time: '08:00', value: 30 },
        { time: '12:00', value: 65 },
        { time: '16:00', value: 45 },
        { time: '20:00', value: 80 },
        { time: '24:00', value: 60 },
      ];

      const x = d3.scalePoint()
        .domain(data.map(d => d.time))
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top]);

      const line = d3.line<any>()
        .x(d => x(d.time)!)
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX);

      // Area
      const area = d3.area<any>()
        .x(d => x(d.time)!)
        .y0(height - margin.bottom)
        .y1(d => y(d.value))
        .curve(d3.curveMonotoneX);

      // Add gradient
      const defs = svg.append('defs');
      const gradient = defs.append('linearGradient')
        .attr('id', 'area-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#3B82F6')
        .attr('stop-opacity', 0.4);
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#3B82F6')
        .attr('stop-opacity', 0.0);

      svg.append('path')
        .datum(data)
        .attr('fill', 'url(#area-gradient)')
        .attr('d', area);

      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#3B82F6')
        .attr('stroke-width', 2)
        .attr('d', line);

      // Points
      svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => x(d.time)!)
        .attr('cy', d => y(d.value))
        .attr('r', 3)
        .attr('fill', '#0B0D12')
        .attr('stroke', '#3B82F6')
        .attr('stroke-width', 2);

      // X-axis
      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSize(0).tickPadding(8))
        .attr('color', '#6B7280')
        .attr('font-size', '10px')
        .attr('font-family', 'var(--font-sans)')
        .select('.domain').remove();
    }

    // Render Pie Chart
    if (pieChartRef.current) {
      const svg = d3.select(pieChartRef.current);
      svg.selectAll('*').remove();
      
      const width = 120;
      const height = 120;
      const radius = Math.min(width, height) / 2;

      const g = svg.append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const data = [
        { label: 'CRÍTICO', value: 15, color: '#EF4444' },
        { label: 'ALTO', value: 25, color: '#F59E0B' },
        { label: 'MEDIO', value: 40, color: '#3B82F6' },
        { label: 'BAJO', value: 20, color: '#10B981' },
      ];

      const pie = d3.pie<any>()
        .value(d => d.value)
        .sort(null)
        .padAngle(0.05);

      const arc = d3.arc<any>()
        .innerRadius(radius - 15)
        .outerRadius(radius)
        .cornerRadius(4);

      g.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => d.data.color)
        .attr('stroke', 'none');
    }
  }, []);

  return (
    <div className="mt-8 mb-4">
      <div className="text-xs text-gray-400 tracking-wider font-semibold mb-3">HISTORICAL TELEMETRY TRENDS</div>
      <div className="bg-[#1A1D24]/50 border border-white/5 rounded-2xl p-4 mb-6 shadow-lg">
        <svg ref={lineChartRef} className="w-full h-[180px]" />
      </div>
      
      <div className="text-xs text-gray-400 tracking-wider font-semibold mb-3">RISK FACTOR DISTRIBUTION</div>
      <div className="bg-[#1A1D24]/50 border border-white/5 rounded-2xl p-5 flex items-center shadow-lg">
        <div className="shrink-0 w-[120px] h-[120px]">
          <svg ref={pieChartRef} className="w-full h-full" viewBox="0 0 120 120" />
        </div>
        <div className="flex flex-col gap-3 flex-1 ml-6">
            <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"/> 
                  <span className="text-gray-300 font-medium tracking-wide">CRÍTICO</span>
                </div>
                <span className="font-bold text-white">15%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"/> 
                  <span className="text-gray-300 font-medium tracking-wide">ALTO</span>
                </div>
                <span className="font-bold text-white">25%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"/> 
                  <span className="text-gray-300 font-medium tracking-wide">MEDIO</span>
                </div>
                <span className="font-bold text-white">40%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"/> 
                  <span className="text-gray-300 font-medium tracking-wide">BAJO</span>
                </div>
                <span className="font-bold text-white">20%</span>
            </div>
        </div>
      </div>
    </div>
  );
}
