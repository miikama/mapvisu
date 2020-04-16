
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Person } from './Person';
import ReactMapGL, { InteractiveMapProps, Marker, Popup, FlyToInterpolator } from "react-map-gl";
import { PersonMarker } from './PersonMarker';
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

export const MapComponent: FunctionComponent<MapProps> = ({ defaults , selectedPerson, onPersonSelected }: MapProps) => {

    defaults.transitionDuration = duration;
    defaults.transitionEasing = easing;
    defaults.transitionInterpolator = interpol;

    const [viewPort, setViewPort] = useState<InteractiveMapProps>(defaults)

    TimeLine.yearChangedEvent.subscribe( (newYear) => {

      if(TimeLine.running()) {
        viewPort.transitionDuration = duration;
        viewPort.transitionEasing = easing;
        viewPort.transitionInterpolator = interpol;
      }

      // Update map centre
      const centre = TimeLine.getCurrentCenter();

      // decrease zoom from 9 -> 3 as function of years
      const maxZoom = 8;
      const minZoom = 5;
      // linearly interpolate between the zoom levels
      const len = TimeLine.getLastYear()  - TimeLine.getFirstYear();
      const dx = (newYear - TimeLine.getFirstYear()) / len;
      const newZoom =  Math.round(minZoom * dx + maxZoom * (1-dx));

      // Prevent miniscule transformations from numerical precision to avoid unnecessary renders.

      if(viewPort.zoom != null) {
        if(Math.abs(viewPort.zoom - newZoom) > 0.3) {          
          console.log("Changing zoom");
          viewPort.zoom = newZoom;
        }
      } else 
        viewPort.zoom = newZoom;

      if(viewPort.latitude == null || viewPort.longitude == null) 
      {
        viewPort.latitude = centre.latitude;
        viewPort.longitude = centre.longitude;
        return;
      }

      if( Math.abs(centre.latitude - viewPort.latitude) > 0.1 || Math.abs(centre.longitude - viewPort.longitude) > 0.1) {
        console.log("Changing centre!, viewport lat: ", viewPort.latitude, " centre lat: ", centre.latitude);
        viewPort.latitude = centre.latitude;
        viewPort.longitude = centre.longitude;
      }

      // // Prevent miniscule transformations from numerical precision to avoid unnecessary renders.
      // const zoomChanged = viewPort.zoom == null ? true : Math.abs(viewPort.zoom - newZoom) > 0.1;
      
      // const centreChanged = viewPort.latitude == null || viewPort.longitude == null ? true : (
      //   Math.abs(centre.latitude - viewPort.latitude) > 0.01 ||  Math.abs(centre.latitude - viewPort.longitude) > 0.01
      // );
      
      // if(!zoomChanged && !centreChanged)
      //   return;
      
      // setViewPort({
      //   width: viewPort.width,
      //   height: viewPort.height,
      //   latitude: centre.latitude,
      //   longitude: centre.longitude,
      //   zoom: newZoom,
      // })
  })

    // Close popups on escape
    useEffect( () => {
      const listener = (e: KeyboardEvent) => {
        if(e.key === "Escape")
        onPersonSelected(null);
      }
      window.addEventListener("keydown", listener);
    }, []);

    return  (
        <ReactMapGL 
        {...viewPort}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={ (viewport) => {

          if(TimeLine.running()) {
            viewport.transitionDuration = duration;
            viewport.transitionEasing = easing;
            viewport.transitionInterpolator = interpol;
          }
          setViewPort(viewport);
        }}
        > 
        {TimeLine.getPersons().map( (person) => {                         
          return <Marker
            key={person.data.id}
            latitude={person.birthLat()}
            longitude={person.birthLong()}>
            <PersonMarker person={person} onPersonSelected={onPersonSelected}/>
          </Marker>          
        })}        
        {selectedPerson != null ? (            
            <Popup
              latitude={selectedPerson.birthLat()}
              longitude={selectedPerson.birthLong()}
              onClose={ () => {onPersonSelected(null)}}
              >
              <div>
                <h2>{selectedPerson.full_name()}</h2>
              </div>
            </Popup>
          ) : null}
      </ReactMapGL>
    )
}   

