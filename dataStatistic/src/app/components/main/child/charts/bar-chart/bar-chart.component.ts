import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {DataState} from '../../../../../interfaces/data.interface';
import {selectSelectedFileData} from '../../../../../store/load-data/load-data.selector';
import * as d3 from 'd3';
import {FilterState} from '../../../../../interfaces/filter.interface';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.less'
})
export class BarChartComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription | null = null;

  constructor(private store: Store<{ data: DataState,filter:FilterState }>) {
  }

  ngOnInit() {
    this.dataSubscription = this.store.select(selectSelectedFileData).subscribe((data) => {
      if (data) {
        this.createChart(data);
      }
    });
  }

  createChart(data: { category: string; value: number }[]) {
    d3.select('#bar-chart').select('svg').remove();

    const width = 400;
    const height = 300;
    const margin = {top: 20, right: 30, bottom: 40, left: 40};

    const svg = d3
      .select('#bar-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([0, width - margin.left - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0, 0, 0, 0.7)')
      .style('color', '#fff')
      .style('padding', '5px')
      .style('border-radius', '5px')
      .style('font-size', '12px');

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.category)!)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - margin.top - margin.bottom - y(d.value))
      .attr('fill', 'steelblue')
      .on('mouseover', (event, d) => {
        tooltip.style('visibility', 'visible')
          .text(`${d.category} : ${d.value}`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', (event.pageY + 5) + 'px')
          .style('left', (event.pageX + 5) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));
  }

  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
  }
}
