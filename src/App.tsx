import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core';

import './App.css';

import { Person } from './Person';
import TimeLine, { VisualiseCommand } from './Timeline';
import { MapComponent } from './MapComponent';
import { InteractiveMapProps } from 'react-map-gl';
import { MapHeader } from './AppBarComponent';

function App() {

  const theme = createMuiTheme({    
    typography: {
    }
  })

  

  const defaults: InteractiveMapProps = {
    latitude: TimeLine.getCurrentCenter().latitude,
    longitude: TimeLine.getCurrentCenter().longitude,
    zoom: 7,    
    width: "100vw",
    height: "93vh",
  }

  const headerHeight: string = "7vh";  

  const  [selectedPerson, updateSelectedPerson] = useState<Person | null>(null);

  const  [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  TimeLine.yearChangedEvent.subscribe((newYear) => {
    setCurrentYear(newYear);    
  });   

  // More logic to the person update
  function selectPerson(person: Person | null) {    
    // Unselect if clicked twice (does not do anythin even if the condition is true)
    if(person && (person.data.id === selectedPerson?.data.id))
      updateSelectedPerson(null);    
      
    updateSelectedPerson(person);
  }

  // start the visualisation
  function changeVisualState(command: VisualiseCommand) {
    console.log("Changing visual state with command: ", command);
    TimeLine.controVisualisation(command);      
  }

  

  return (    
    <div className="App">
      <MapHeader currentYear={currentYear} theme={theme} height={headerHeight} controlVisualisation={changeVisualState}></MapHeader>
      <MapComponent defaults={defaults} selectedPerson={selectedPerson} onPersonSelected={selectPerson}/>
    </div>
  );
}

export default App;
