
export interface Place {
    name: string;
    latitude: number;
    longitude: number;
    address?: string;
}

export enum LifeEventType {
    BIRTH,
    DEATH,
}

export enum Gender {
    Male,
    Female
}

export interface LifeEvent {
    type: LifeEventType;
    date?: Date;
    place?: Place;
}

export type PersonID = number

export interface PersonData {
    id: PersonID;
    gender?: Gender;
    first_name: string;
    family_name: string;
    birth?: LifeEvent;
    death?: LifeEvent;
    home?: Place;
    parents: PersonID[];
    children: PersonID[];
    spouses: PersonID[];
    pointer?: string; // entry in the gedcom data.
    extra_information?: string;
}

export interface PersonDataWithBirth extends PersonData {
    birth: LifeEvent;
}



class Person {

    constructor(public data: PersonData) {
    }

    id(): number {
        return this.data.id;
    }

    idString(): string {
        return this.data.id.toString();
    }

    full_name(): string {
        return this.data.first_name + " " + this.data.family_name;
    }

    infoText(): string {
        const info = this.data?.extra_information
        if (info == null)
            return "";
        return info;
    }

    ancestryLevel(): number {
        return this.data.id;
    }

    birthLat(): number {
        return this.data.birth?.place?.latitude || 0;
    }

    birthLong(): number {
        return this.data.birth?.place?.longitude || 0;
    }

    birthYear(): number | undefined {
        return this.data.birth?.date?.getFullYear() || undefined;
    }

    deathYear(): number | undefined {
        return this.data.death?.date?.getFullYear() || undefined;
    }

    birthPlace(): Place | undefined {
        if (this.birthLat() && this.birthLong())
            return this.data.birth?.place;

        return undefined;
    }

    parentIDs(): PersonID[] {
        return this.data.parents;
    }

    childrenIDs(): PersonID[] {
        return this.data.parents;
    }

    spouseIDs(): PersonID[] {
        return this.data.spouses;
    }

    addChild(person: Person) {
        if (this.data.children == null) {
            this.data.children = [];
        }

        this.data.children.push(person.id());
    }

    addParent(person: Person) {
        if (this.data.parents == null) {
            this.data.parents = [];
        }

        this.data.parents.push(person.id());
    }

    addSpouse(person: Person) {
        if (this.data.spouses == null) {
            this.data.spouses = [];
        }

        this.data.spouses.push(person.id());
    }

    hasChildren() {
        return this.data.children && this.data.children.length > 0;
    }

    hasParents() {
        return this.data.parents && this.data.parents.length > 0;
    }

    hasRelatives() {
        return this.hasParents() || this.hasChildren();
    }

    lifeEventLocation(eventType: LifeEventType): Place | undefined {
        if (eventType === LifeEventType.BIRTH) {
            return this.data.birth?.place;
        }
        else if (eventType === LifeEventType.DEATH) {
            return this.data.death?.place;
        }
    }

    addLifeEventLocation(location: Place, eventType: LifeEventType) {
        /**
         * Update the life event if it exists, or init if it does not.
         */
        if (eventType === LifeEventType.BIRTH) {
            this.data.birth = {
                ...this.data.birth,
                type: eventType,
                place: location,
            }
        }
        else if (eventType === LifeEventType.DEATH) {
            this.data.death = {
                ...this.data.death,
                type: eventType,
                place: location,
            }
        }
    }
}


export { Person }
