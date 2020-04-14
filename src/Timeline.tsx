import { Person } from "./Person";
import SelectInput from "@material-ui/core/Select/SelectInput";
import { Loader } from "./dataLoader";
import { Subject } from "rxjs";


export enum VisualisationState {
    Stopped = 0,
    Running = 1,   
}

export enum VisualiseCommand {
    Start,
    Stop,
}


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



class TimeLine {

    // A mapping of available years by event type to persons
    births: { [year: number]: Person[]};

    // Timeline keeps track of the current year
    currentYear: number = 2020;

    visualisationState: VisualisationState;

    persons: Person[] = [];

    yearChangedCallBack: ((year: number) => any) | null = null;

    yearChangedEvent: Subject<number>;

    constructor() {

        const loader = new Loader();
        this.persons = loader.getData();  

        this.visualisationState = VisualisationState.Stopped;

        this.births = {};

        this.yearChangedEvent = new Subject();

        // Add persons to boxes slots on their birth years
        this.persons.forEach( (person) => {
            if(person.data.birth == null)
                return;
            
            const birthYear = person.data.birth.date.getFullYear();
            if(birthYear in this.births){
                this.births[birthYear].push(person);
            }
            else {
                this.births[birthYear] = [person];
            }

        });

    }

    setPersons(persons: Person[]) {
        this.persons = persons;
    }        

    async startVisualisation() {        

        // set starting year
        this.currentYear = this.getFirstYear() - 3;
        
        // set state to running 
        this.visualisationState = VisualisationState.Running;        
    
        // at which year to stop at
        const latestPossibleYear = new Date().getFullYear();
    
        // Loop indefinitely
        while ( this.visualisationState === VisualisationState.Running )  
        {
            this.currentYear++;
            this.yearChangedEvent.next(this.currentYear);   
            if(this.currentYear >= latestPossibleYear)
            {
                this.visualisationState = VisualisationState.Stopped;
                
                break;
            }   
                
            await sleep(100);
        }
    }

    stopVisualisation() {
        this.visualisationState = VisualisationState.Stopped;
    }

    /** Main entry point for controlling the visualisation state */
    controVisualisation(command: VisualiseCommand) {
        console.log("Controlling visualisation, current state is: ", this.visualisationState);
        if(command === VisualiseCommand.Start && this.visualisationState === VisualisationState.Stopped)
            this.startVisualisation();

        if(command === VisualiseCommand.Stop)
            this.stopVisualisation();
    }   

    getPersons(): Person[] {        
        return this.personsBornBeforeYear(this.currentYear);
    }

    getCurrentYear(): number {
        return this.currentYear;
    }

    /** Present years sorted */
    getPresentYears() : number[] {
        return Object.keys(this.births).map((year) => {return parseInt(year); } ).sort();
    }

    personsBornBeforeYear(year: number): Person[] {
        return this.persons.filter( (person) => {
            if(person.birthYear() && person.birthYear()! <= year)
                return true;
            return false;
        });
    }

    getLastYear(): number {
        return new Date().getFullYear();
    }

    getFirstYear(): number {
        let allYears = this.getPresentYears();  
        if(allYears.length == 0)      
            return this.getLastYear();
        return allYears[0];
    }

    




}





export default new TimeLine()