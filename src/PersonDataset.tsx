import { Person, Gender, LifeEventType } from './Person';
import { queryResult } from './LocationService';


interface PersonNode {
    id: string;
    name: string;
    val: number;
    color?: string;
}

interface Link {
    source: string;
    target: string;
    width?: number;
    color?: string;
}

interface ForceGraphdata {
    nodes: PersonNode[];
    links: Link[];
}


export class PersonDataset {

    _personMap: Map<number, Person> = new Map();

    constructor(private persons: Person[]) {

        persons.forEach((person) => {
            this._personMap.set(person.data.id, person);
        })

    }

    /**
     * 
     * @param eventType type of events to query
     */
    uniqueLocationsOfType(eventType: LifeEventType): string[] {

        if (eventType !== LifeEventType.BIRTH)
            console.error("Only querying for births.");

        const presentLocations = new Set(
            this.persons
                .filter((person) => {
                    return person.data.birth != null && person.data.birth.place != null;
                }).map((person) => {
                    return person.data.birth!.place!.name;
                }));

        return Array.from(presentLocations);
    }

    addLocations(foundLocations: queryResult, eventType: LifeEventType) {
        /**
         *  Add the argument locations to people.
         */

        let counter = 0;
        this.persons.forEach((person) => {
            const eventLocationName = person.lifeEventLocation(eventType)?.name;
            if (eventLocationName && eventLocationName in foundLocations) {
                counter++;
                person.addLifeEventLocation(foundLocations[eventLocationName], eventType);
            }
        });
        console.log("Added locations for ", counter, " people out of: ", this.persons.length);
    }


    personById(id: number): Person | undefined {
        if (!this._personMap.has(id))
            return undefined;

        return this._personMap.get(id);
    }

    parentsForAPerson(person: Person): Person[] {
        const parentIds = person.parentIDs();

        let parents: Person[] = [];

        parentIds.forEach((id) => {
            const parent = this.personById(id);
            if (parent !== undefined)
                parents.push(parent);
        })
        return parents;
    }

    childrenForAPerson(person: Person): Person[] {
        const childrenIds = person.childrenIDs();

        let children: Person[] = [];

        childrenIds.forEach((id) => {
            const child = this.personById(id);
            if (child !== undefined)
                children.push(child);
        })
        return children;
    }

    /**
     * 
     * @param person person to find spouses for
     */
    spousesForAPerson(person: Person): Person[] {
        const spouseIds = person.spouseIDs();

        let spouses: Person[] = [];

        spouseIds.forEach((id) => {
            const spouse = this.personById(id);
            if (spouse !== undefined)
                spouses.push(spouse);
        })
        return spouses;
    }

    personTargets(person: Person): string[] {

        // Always connect to spouses
        let connectionIds = this.spousesForAPerson(person).map((person) => {
            return person.idString();
        });

        // Connecting both parents to all children makes the force grap not layout 
        // very well. Only connect fathers to their children
        if (person.data.gender != null && person.data.gender === Gender.Female && person.spouseIDs().length > 0) {
            person.spouseIDs().forEach((id) => {
                const spouse = this.personById(id);
                if (spouse == null)
                    return;

                // connect the spouses parents to the husband
                connectionIds = connectionIds.concat(this.parentsForAPerson(person).map((parent) => {
                    return parent.idString();
                }));

                // // connect spouses children to the husband
                // connectionIds = connectionIds.concat(this.childrenForAPerson(spouse).map( (parent) => {
                //     return parent.idString();
                // }));

            })

            return connectionIds;

        }

        let childConnectionIds: string[] = [];
        this.childrenForAPerson(person).forEach((child) => {
            // Connect everyone through the males of the family. So if the child is female and has a husband
            // instead of adding a link to the child, add a link to the childs husband
            if (child.data?.gender === Gender.Female && child.spouseIDs().length > 0) {
                child.spouseIDs().forEach((id) => {
                    childConnectionIds.push(id.toString());
                });
                return;
            }

            childConnectionIds.push(child.idString());
        });
        connectionIds = connectionIds.concat(childConnectionIds);

        let parentConnectionsIds: string[] = [];
        const parents = this.parentsForAPerson(person)
        parents.forEach((parent) => {
            // Do not connect children to their mothers, if dads are available
            if (parent.data?.gender === Gender.Female && parents.length > 1)
                return;
            parentConnectionsIds.push(parent.idString());
        });
        connectionIds = connectionIds.concat(parentConnectionsIds);
        return connectionIds;
    }


    nodes(persons: Person[]): PersonNode[] {

        console.warn("Filtering out lonely people!")
        persons = persons.filter((person) => {
            return person.hasRelatives();
        });

        let list: PersonNode[] = [];
        persons.forEach((person) => {
            list.push({
                id: person.data.id.toString(),
                name: person.full_name(),
                val: 2,
                color: person.data.gender === Gender.Male ? "#3C91D7" : "#F74B56",
            });
        });



        return list;

    }

    links(persons: Person[]): Link[] {

        let links: Link[] = [];

        persons.forEach((person) => {
            const targets = this.personTargets(person);
            targets.forEach((target) => {
                links.push({
                    source: person.idString(),
                    target: target,
                })
            })

        })

        return links;
    }

    graphData(): ForceGraphdata {

        return {
            nodes: this.nodes(this.persons),
            links: this.links(this.persons)
        }
    }



}