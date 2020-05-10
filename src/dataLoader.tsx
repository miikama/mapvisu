
import { Person, LifeEventType, Gender, PersonData, LifeEvent, Place } from './Person';

import { data } from "./data/data";

import gedcom from "parse-gedcom";


interface GedcomDataObject {
    data: string;
    pointer: string;
    tag: string;
    tree: GedcomDataObject[];
}

type EntryId = string;

interface FamilyEntry extends GedcomDataObject {
}

interface PersonsEdges {
    children: Set<EntryId>;
    parents: Set<EntryId>;
    spouses: Set<EntryId>;
}

type Connections = Map<EntryId, PersonsEdges>;


enum GedcomTags {
    Individual = "INDI",
    Location = "PLAC",
    Name = "NAME",
    NameSuffix = "NSFX",
    Birth = "BIRT",
    Date = "DATE",
    Sex = "SEX",
    Occupation = "OCCU",
    Death = "DEAT",
    Family = "FAM",
    FamilyWhereAsChild = "FAMC",
    FamilyWhereAsParent = "FAMS",
    Husband = "HUSB",
    Wife = "WIFE",
    Child = "CHIL",
    Note = "NOTE",
    Continuation = "CONT",
}

class Loader {

    cur_id = 0

    persons: Person[];

    constructor() {

        const new_data: GedcomDataObject[] = gedcom.parse(data);
        console.log("new_data: ", new_data);
        this.persons = this.parseGedcom(new_data);
    }

    /**
     * 
     * @param node A person node in the gedcom data structure
     */
    parsePersonInfo(node: GedcomDataObject): Person | null {

        const infoNodes = node.tree;
        let inputValid: boolean = true;
        let info: PersonData = {
            id: -1,
            pointer: node.pointer,
            first_name: "Tamppa",
            family_name: "Tumpeli",
            birth: {
                type: LifeEventType.BIRTH,
                date: new Date(1929, 1, 1),
                place: {
                    name: "Vimpeli",
                    latitude: 63.164000,
                    longitude: 23.8194821,
                },
            },
            children: [],
            parents: [],
            spouses: [],
            gender: undefined,
        }

        // Gather the info for this individual from the data entry
        infoNodes.forEach((node) => {
            if (node.tag === GedcomTags.Name) {

                const split_name = node.data.split('/');
                if (split_name.length === 0) {
                    inputValid = false;
                    return;
                }
                info.first_name = split_name.length > 2 ? split_name[0] + " " + split_name[1] : split_name[0];
                info.family_name = split_name[split_name.length - 1];
            }

            if (node.tag === GedcomTags.Sex) {
                info.gender = node.data === "F" ? Gender.Female : Gender.Male;
            }

            if (node.tag === GedcomTags.Note) {
                info.extra_information = node.data;
            }

            if (node.tag === GedcomTags.Continuation) {
                console.log("Found continuation of data")
                if (info.extra_information != null) {
                    console.log("added continuation of data")
                    info.extra_information += node.data;
                    console.log("extra info is now: ", info.extra_information);
                }
            }

            if (node.tag === GedcomTags.Birth) {
                const birthData = this.parseEvent(node, LifeEventType.BIRTH);
                if (birthData != null)
                    info.birth = birthData;
            }

            if (node.tag === GedcomTags.Death) {
                const deathData = this.parseEvent(node, LifeEventType.DEATH);
                if (deathData != null)
                    info.death = deathData;
            }

        });

        if (inputValid) {
            info.id = this.getId();
            return new Person(info);
        }

        return null
    }

    /**
     *  An event has place and date. Each event also has its own type,     *  
     * 
     * @param node a node representing an event in the GedCom data
     */
    parseEvent(node: GedcomDataObject, eventType: LifeEventType): LifeEvent | null {


        let date: Date | null = null;
        let placeName: string | null = null;

        node.tree.forEach((eventNode) => {
            if (eventNode.tag === GedcomTags.Date) {
                date = new Date(Date.parse(eventNode.data));
            }
            if (eventNode.tag === GedcomTags.Location) {
                placeName = eventNode.data;
            }
        });

        if (date === null) {
            console.warn("No date parsed");
            return null;
        }
        if (placeName === null) {
            console.warn("No place parsed");
            return null;
        }

        // parse the place into location
        const loc = this.placeFromName(placeName);

        const birthData = {
            type: eventType,
            date: date,
            place: loc,
        }

        return birthData;
    }

    /**
     *  Add connections of a single 'family' entry. Connect children to parents
     *  and parents to children.
     * 
     *  Note: Not connecting the parents to each other. 
     * 
     * @param connections connections to update
     * @param parents list of parents
     * @param children list of children
     */
    parseRelations(connections: Connections, parents: EntryId[], children: EntryId[]): Connections {

        parents.forEach((parent) => {
            children.forEach((child) => {
                // start by adding the parent/children if they do not exist in the connections
                if (!connections.has(parent)) {
                    connections.set(parent, {
                        children: new Set(),
                        parents: new Set(),
                        spouses: new Set(),
                    });
                }
                if (!connections.has(child)) {
                    connections.set(child, {
                        children: new Set(),
                        parents: new Set(),
                        spouses: new Set(),
                    });
                }

                // we can be sure that the keys (parent/child) are in the set since we just added them
                connections.get(parent)!.children.add(child);
                connections.get(child)!.parents.add(parent);
            })
        });

        // Add connections for parents
        if (parents.length === 2) {
            if (connections.get(parents[0]) != null && connections.get(parents[1]) != null) {
                connections.get(parents[0])!.spouses.add(parents[1]);
                connections.get(parents[1])!.spouses.add(parents[0]);
            }
        }


        return connections;
    }

    /**
     *  After parsing families and persons, fill the persons children and parents
     *  
     * @param persons list of all present individuals
     * @param connections map from person id to object with 
     *              connections to persons childred and parents.
     */
    connectPersons(persons: Person[], connections: Connections) {

        let personsById = new Map<EntryId, Person>();

        // We have the mapping from person ids -> person ids, but we want the actual person objects...
        persons.forEach((person) => {
            const curID = person.data.pointer;
            if (curID == null) {
                console.error("person without valid pointer");
                return;
            }
            if (personsById.has(curID)) {
                console.error("person found again!");
                return;
            }

            personsById.set(curID, person);
        })

        persons.forEach((person) => {
            if (person.data.pointer == null) {
                console.error("person without valid pointer");
                return;
            }

            const currentConnections = connections.get(person.data.pointer);
            if (currentConnections == null) {
                // console.warn(`No connections for person: ${person} and pointer ${person.data.pointer}`);
                return;
            }

            currentConnections.children.forEach((childId) => {
                const child = personsById.get(childId);
                if (child == null) {
                    console.error(`Adding child but child object was not found for id ${childId}.`);
                    return;
                }
                person.addChild(child);
            });

            currentConnections.parents.forEach((parentID) => {
                const parent = personsById.get(parentID);
                if (parent == null) {
                    console.error(`Adding parent but parent object was not found for id ${parentID}.`);
                    return;
                }
                person.addParent(parent);
            });

            currentConnections.spouses.forEach((spouseID) => {
                const spouse = personsById.get(spouseID);
                if (spouse == null) {
                    console.error(`Adding spouse but spouse object was not found for id ${spouseID}.`);
                    return;
                }
                person.addSpouse(spouse);
            });


        });


    }



    parseGedcom(data: GedcomDataObject[]): Person[] {
        let persons: Person[] = []

        /**
         *  In the Gedcom data, family information is 
         *  separated from the child information.
         * 
         *  First parse the family information.         
         */
        let personsConnections = new Map<EntryId, PersonsEdges>();

        data.forEach((entry) => {
            if (entry.tag === GedcomTags.Family) {

                let dadID: EntryId | null = null;
                let momID: EntryId | null = null;
                let children: EntryId[] = [];

                entry.tree.forEach((familyEntry) => {
                    if (familyEntry.tag === GedcomTags.Husband)
                        dadID = familyEntry.data; // NOTE: id in data, not in pointer

                    if (familyEntry.tag === GedcomTags.Wife)
                        momID = familyEntry.data;

                    if (familyEntry.tag === GedcomTags.Child)
                        children.push(familyEntry.data);
                });

                let parents: EntryId[] = [];
                if (dadID != null)
                    parents.push(dadID);
                if (momID != null)
                    parents.push(momID);

                console.log(`Adding connections for entry ${entry}`);

                // Add the children to their parents and the parents to their children
                personsConnections = this.parseRelations(personsConnections, parents, children);

            }
        });

        /**
         *  After parsing the family information, parse all 
         *  the individual persons into objects.         
         */
        data.forEach((entry) => {
            if (entry.tag === GedcomTags.Individual) {
                const person = this.parsePersonInfo(entry);
                if (person != null)
                    persons.push(person);
            }

        });

        /**
         *  And after initialising all persons, connect them.         
         */
        this.connectPersons(persons, personsConnections);

        return persons;
    }

    getId() {
        this.cur_id++;
        return this.cur_id;
    }

    getData(): Person[] {
        const filtered = this.persons.filter(person => {
            if (person.data.birth == null)
                return false;
            return true;
        })
        return filtered;
    }

    queried_locations: string[] = [];

    placeFromName(name: string): Place {

        this.queried_locations.push(name);

        return {
            name: name,
            longitude: 0,
            latitude: 0
        }
    }

}

export { Loader }