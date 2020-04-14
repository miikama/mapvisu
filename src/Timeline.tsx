import { Person } from "./Person";
import SelectInput from "@material-ui/core/Select/SelectInput";
import { Loader } from "./dataLoader";


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

    constructor() {

        const loader = new Loader();
        this.persons = loader.getData();  

        this.visualisationState = VisualisationState.Stopped;

        this.births = {};

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
        console.log("Adding persons!!!!!!!!!!!!!!!!!!!!");
        this.persons = persons;
    }

    setYearChangedCallback(callback: (year: number) => any ) {
        console.log("adding callback!!!!!!!!!!!!!!!!!!!!");
        this.yearChangedCallBack = callback;
    }

    async startVisualisation() {
        let allYears = this.getPresentYears();
        this.currentYear = allYears && allYears[0];    
        
        this.visualisationState = VisualisationState.Running;
        
    
        const currentYear = new Date().getFullYear();

        // Just return if no yearchanged callback set
        if(this.yearChangedCallBack == null)
        {
            console.warn("No yearChangedCallback set, not starting visualisation");
            return;
        }        
    
        // Loop indefinitely
        while ( this.visualisationState === VisualisationState.Running )  
        {
            this.currentYear++;
            this.yearChangedCallBack(this.currentYear);
            if(this.currentYear % 10 == 0)
                console.log("Going an year: ", this.currentYear);
    
            if(this.currentYear >= currentYear)
            {
                this.visualisationState = VisualisationState.Stopped;
                
                break;
            }   
                
            await sleep(1000);
        }
    }

    stopVisualisation() {
        this.visualisationState = VisualisationState.Stopped;
    }

    /** Main entry point for controlling the visualisation state */
    controVisualisation(command: VisualiseCommand) {
        console.log("Controlling visualistaion, current state is: ", this.visualisationState);
        if(command === VisualiseCommand.Start && this.visualisationState === VisualisationState.Stopped)
            this.startVisualisation();

        if(command === VisualiseCommand.Stop)
            this.stopVisualisation();

        console.log("Started visualistaion, current state is: ", this.visualisationState);
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

    




}





export default new TimeLine()