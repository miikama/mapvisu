
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Person } from './Person';
import ReactMapGL, { InteractiveMapProps, Marker, Popup } from "react-map-gl";
import { PersonMarker } from './PersonMarker';
import TimeLine from './Timeline';


interface MapProps {
    selectedPerson: Person | null;
    onPersonSelected: (person: Person | null) => void;
    defaults: InteractiveMapProps;    
}

export const MapComponent: FunctionComponent<MapProps> = ({ defaults , selectedPerson, onPersonSelected }: MapProps) => {

    const [viewPort, setViewPort] = useState<InteractiveMapProps>(defaults)

    TimeLine.yearChangedEvent.subscribe( (newYear) => {
      // decrease zoom from 9 -> 3 as function of years
      const maxZoom = 9;
      const minZoom = 3;
      // linearly interpolate between the zoom levels
      const len = TimeLine.getLastYear()  - TimeLine.getFirstYear();
      const dx = (newYear - TimeLine.getFirstYear()) / len;
      const newZoom =  Math.round(minZoom * dx + maxZoom * (1-dx));

      viewPort.zoom = newZoom;
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

