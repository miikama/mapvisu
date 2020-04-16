import { Coordinate } from './Timeline';

export interface Place {
    name: string;
    latitude: number;
    longitude: number;
}

export enum LifeEventType {
    BIRTH,
    DEATH,    
}

export interface LifeEvent {
    type: LifeEventType;
    date: Date;
    place?: Place;
}

export type PersonID = number
    
export interface PersonData {
    id: PersonID;
    first_name: string;
    family_name: string;
    birth?: LifeEvent;
    death?: LifeEvent;
    home?: Place;  
    parents?: PersonID[];
    children?: PersonID[];
}

export interface PersonDataWithBirth extends PersonData {    
    birth: LifeEvent;    
}



class Person {

    constructor(public data: PersonData) {
    }

    full_name(): string {
        return this.data.first_name + " " + this.data.family_name;
    }

    ancestryLevel(): number {
        return this.data.id;
    }

    birthLat(): number {
        return this.data.birth?.place?.latitude || 0;
    }

    birthLong(): number {
        return this.data.birth?.place?.longitude || 0;
    }

    birthYear() : number | undefined {
        return this.data.birth?.date.getFullYear() || undefined;
    }

    birthPlace(): Coordinate | undefined {

        if(this.birthLat() && this.birthLong())
            return {
                latitude: this.birthLat(),
                longitude: this.birthLong(),
            }
        return undefined;       

    }
}


export { Person }
