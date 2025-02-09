import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {DataState} from '../../../../../interfaces/data.interface';
import {selectSelectedFileData} from '../../../../../store/load-data/load-data.selector';
import * as d3 from 'd3';
import {FilterState} from '../../../../../interfaces/filter.interface';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.less'
})
export class PieChartComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription | null = null;
  // selectSelectedFileData = toSignal(this.store.select(selectSelectedFileData));
  // filteredData: { category: string; value: number }[] = [];

  constructor(private store: Store<{ data: DataState, filter: FilterState }>) {
  }

  ngOnInit() {
    this.dataSubscription = this.store.select(selectSelectedFileData).subscribe((data) => {
      if (data) {
        this.createChart(data);
      }
    });
    // if (this.selectSelectedFileData()) {
    //   this.createChart(this.selectSelectedFileData() ?? []);
    // }
  }

  createChart(data: { category: string; value: number }[]) {
    d3.select('#chart').select('svg').remove();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<{ category: string; value: number }>().value((d) => d.value);
    const arc = d3.arc<d3.PieArcDatum<{ category: string; value: number }>>()
      .innerRadius(0)
      .outerRadius(radius);

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

    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d: any, i: any) => color(String(i)))
      .on('mouseover', (event, d) => {
        tooltip.style('visibility', 'visible')
          .text(`${d.data.category} : ${d.data.value}`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', (event.pageY + 5) + 'px')
          .style('left', (event.pageX + 5) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    arcs.append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('fill', '#fff')
      .text((d: { data: { category: any; }; }) => d.data.category);
  }

  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
  }
}
