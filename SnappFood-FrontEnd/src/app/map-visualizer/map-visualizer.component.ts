import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FeatureCollection } from 'geojson';
import * as mapboxgl from 'mapbox-gl';
import { regions } from './utils/regions';

@Component({
  selector: 'app-map-visualizer',
  templateUrl: './map-visualizer.component.html',
  styleUrls: ['./map-visualizer.component.scss'],
})
export class MapVisualizerComponent implements AfterViewInit, OnDestroy {
  @Output()
  public regionClicked: EventEmitter<number> = new EventEmitter<number>();

  private map: mapboxgl.Map;
  private data: FeatureCollection;
  private hoveredStateId = null;

  public ngAfterViewInit(): void {
    this.initData();

    this.initMap();

    this.map.on('load', () => {
      this.addRegions();

      this.onMapClicked();
    });
  }

  public ngOnDestroy(): void {
    this.map.removeLayer(this.getLineLayerId());

    this.map.removeLayer(this.getFillLayerId());

    this.map.removeSource(this.getSourceId());
  }

  private initMap(): void {
    (mapboxgl as any).accessToken =
      'pk.eyJ1IjoibWhoZWlkYXJ6YWRlaCIsImEiOiJja2hjMHZxMDEwMmx2MnFtcDZvM3dnb3NtIn0.2A9N_1V2IYkb2Yl1SyG4AQ';

    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: { lat: 35.6892, lon: 51.389 },
      zoom: 10,
    });
  }

  private initData(): void {
    this.data = regions;

    this.data.features.forEach((feature) => {
      feature.properties.hover = false;
      feature.properties.selected = false;
    });
  }

  private addRegions(): void {
    const source: mapboxgl.AnySourceData = {
      type: 'geojson',
      data: this.data,
    };

    this.map.addSource(this.getSourceId(), source);

    const fillLayer: mapboxgl.AnyLayer = {
      id: this.getFillLayerId(),
      type: 'fill',
      source: this.getSourceId(),
      paint: {
        'fill-color': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          'red',
          ['boolean', ['feature-state', 'selected'], false],
          'blue',
          'green',
        ],
        'fill-opacity': 0.4,
      },
    };

    const lineLayer: mapboxgl.AnyLayer = {
      id: this.getLineLayerId(),
      type: 'line',
      source: this.getSourceId(),
      paint: {
        'line-color': 'red',
        'line-width': 3,
      },
    };

    this.map.addLayer(fillLayer);
    this.map.addLayer(lineLayer);

    this.addLayerEvents();
  }

  private addLayerEvents(): void {
    this.map.on('mousemove', this.getFillLayerId(), (e) => {
      if (e.features.length > 0) {
        if (this.hoveredStateId !== null) {
          this.map.setFeatureState(
            { source: this.getSourceId(), id: this.hoveredStateId },
            { hover: false }
          );
        }

        this.hoveredStateId = e.features[0].id;
        this.map.setFeatureState(
          { source: this.getSourceId(), id: this.hoveredStateId },
          { hover: true }
        );
      }
    });

    this.map.on('mouseleave', this.getFillLayerId(), () => {
      if (this.hoveredStateId !== null) {
        this.map.setFeatureState(
          { source: this.getSourceId(), id: this.hoveredStateId },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
  }

  private onMapClicked(): void {
    this.map.on('click', this.getFillLayerId(), (e) => {
      const region = e.features[0].properties.region;

      const selected = this.map.getFeatureState(e.features[0]).selected;

      this.map.setFeatureState(
        { source: this.getSourceId(), id: e.features[0].id },
        { selected: !selected }
      );

      this.regionClicked.emit(region);
    });
  }

  private getSourceId(): string {
    return 'regions-source';
  }

  private getFillLayerId(): string {
    return 'regions-fill-layer';
  }

  private getLineLayerId(): string {
    return 'regions-line-layer';
  }
}
