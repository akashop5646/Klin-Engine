import { BuilderStore } from "../../state/BuilderStore";
import { EventService } from "../../services/EventService";

export class ViewportManager {
  private store: BuilderStore;
  private eventService: EventService;

  constructor(store: BuilderStore, eventService: EventService) {
    this.store = store;
    this.eventService = eventService;
  }

  setDevice(type: "desktop" | "laptop" | "tablet" | "mobile" | "custom", width?: number, height?: number) {
    const defaultDims = {
      desktop: { width: 1440, height: 900 },
      laptop: { width: 1024, height: 768 },
      tablet: { width: 768, height: 1024 },
      mobile: { width: 375, height: 812 },
      custom: { width: 1200, height: 800 },
    };

    const dims = {
      width: width ?? defaultDims[type].width,
      height: height ?? defaultDims[type].height,
    };

    this.store.update({
      viewport: {
        ...this.store.getState().viewport,
        type,
        ...dims,
      },
    });

    this.eventService.publish("builder.viewport.changed", { type, ...dims });
  }

  setZoom(zoom: number) {
    this.store.update({
      viewport: {
        ...this.store.getState().viewport,
        zoom,
      },
    });
    this.eventService.publish("builder.zoom.changed", { zoom });
  }

  pan(x: number, y: number) {
    this.store.update({
      viewport: {
        ...this.store.getState().viewport,
        pan: { x, y },
      },
    });
  }

  fitScreen() {
    this.setZoom(1);
    this.pan(0, 0);
  }
}
