
import React, { FunctionComponent, useState } from 'react';
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

