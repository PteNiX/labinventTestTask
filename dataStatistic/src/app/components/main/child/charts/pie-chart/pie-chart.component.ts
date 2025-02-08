import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {DataState} from '../../../../../interfaces/data.interface';
import {selectSelectedFileData} from '../../../../../store/load-data/load-data.selector';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.less'
})
export class PieChartComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription | null = null;

  constructor(private store: Store<{ data: DataState }>, private el: ElementRef) {
  }

  ngOnInit() {
    this.dataSubscription = this.store.select(selectSelectedFileData).subscribe((data) => {
      if (data) {
        this.createChart(data);
      }
    });
  }

  createChart(data: { category: string; value: number }[]) {
    d3.select('#chart').select('svg').remove(); // Удаляем старый график

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

    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d: any, i: any) => color(String(i)));

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
