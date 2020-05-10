
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Typography, Box } from "@material-ui/core";
import ReactMapGL, { InteractiveMapProps, Marker, Popup, FlyToInterpolator } from "react-map-gl";

import { Person } from './Person';
import { PersonMarker } from './PersonMarker';
import { PersonPopup } from './PersonPopup';
import TimeLine from './Timeline';


import * as d3 from "d3-ease";



interface MapProps {
  selectedPerson: Person | null;
  onPersonSelected: (person: Person | null) => void;
  defaults: InteractiveMapProps;
}

// constant defaults for the map transitions
const duration = 1000;
const easing = d3.easeCubic;
const interpol = new FlyToInterpolator();

// Keep track whether we currently have a transition in progress
let transitionStartinEnabled = true;

export const MapComponent: FunctionComponent<MapProps> = ({ defaults, selectedPerson, onPersonSelected }: MapProps) => {

  defaults.transitionDuration = duration;
  defaults.transitionEasing = easing;
  defaults.transitionInterpolator = interpol;

  const [viewPort, setViewPort] = useState<InteractiveMapProps>(defaults)

  TimeLine.yearChangedEvent.subscribe((newYear) => {

    if (TimeLine.running()) {
      viewPort.transitionDuration = duration;
      viewPort.transitionEasing = easing;
      viewPort.transitionInterpolator = interpol;
    }


    // We are transition only if the current is not running
    if (!transitionStartinEnabled)
      return;

    // Update map centre
    const centre = TimeLine.getCurrentCenter();

    // decrease zoom from 9 -> 3 as function of years
    const maxZoom = 8;
    const minZoom = 5;
    // linearly interpolate between the zoom levels
    const len = TimeLine.getLastYear() - TimeLine.getFirstYear();
    const dx = (newYear - TimeLine.getFirstYear()) / len;
    const newZoom = Math.round(minZoom * dx + maxZoom * (1 - dx));

    // Prevent miniscule transformations from numerical precision to avoid unnecessary renders.

    if (viewPort.zoom != null) {
      if (Math.abs(viewPort.zoom - newZoom) > 0.3) {
        viewPort.zoom = newZoom;
      }
    } else
      viewPort.zoom = newZoom;

    if (viewPort.latitude == null || viewPort.longitude == null) {
      viewPort.latitude = centre.latitude;
      viewPort.longitude = centre.longitude;
      return;
    }

    if (Math.abs(centre.latitude - viewPort.latitude) > 0.1 || Math.abs(centre.longitude - viewPort.longitude) > 0.1) {
      viewPort.latitude = centre.latitude;
      viewPort.longitude = centre.longitude;
    }

  })

  // Close popups on escape
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape")
        onPersonSelected(null);
    }
    window.addEventListener("keydown", listener);

    console.log("We got ", TimeLine.getPersons().length, " people on the map.");
  }, []);

  return (
    <ReactMapGL
      {...viewPort}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(viewport) => {

        if (TimeLine.running()) {
          viewport.transitionDuration = duration;
          viewport.transitionEasing = easing;
          viewport.transitionInterpolator = interpol;
        }
        setViewPort(viewport);
      }}
      onTransitionEnd={() => {
        console.log("Ended transition")
        transitionStartinEnabled = true;
      }}
      onTransitionStart={() => {
        console.log("Started transition")
        transitionStartinEnabled = false;
      }}
    >
      {TimeLine.getPersons().map((person) => {
        return <Marker
          key={person.data.id}
          latitude={person.birthLat() + 1e-5 * Math.sin(2 * Math.PI * person.drawing_seed) * 40}
          longitude={person.birthLong() + 2 * 1e-5 * Math.cos(2 * Math.PI * person.drawing_seed) * 40}>
          <PersonMarker person={person} onPersonSelected={onPersonSelected} />
        </Marker>
      })}
      {selectedPerson != null ? <PersonPopup selectedPerson={selectedPerson} onPersonSelected={onPersonSelected} /> : null}
    </ReactMapGL>
  )
}

