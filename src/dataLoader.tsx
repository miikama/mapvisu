
import { Person, LifeEventType } from "./Person"


class Loader {

    cur_id = 0

    persons: Person[];

    constructor() {

        let p1 = new Person({
            id: this.getId(),
            first_name: "Tamppa",
            family_name: "Tumpeli",
            birth: {
                type: LifeEventType.BIRTH,
                date: new Date(1929, 1, 1),
                place: {
                    name: "Vimpeli",
                    latitude: 63.164000,
                    longitude: 23.8194821,
                }
            },            
        })

        let p2 = new Person({
            id: this.getId(),
            first_name: "Kalle",
            family_name: "Koivu",
            birth: {
                type: LifeEventType.BIRTH,
                date: new Date(1963, 1, 1),
                place: {
                    name: "Vimpeli",
                    latitude: 63.1645558,
                    longitude: 23.8194821,
                }
            },  
            parents: [p1.data.id],          
        })

        let p3 = new Person({
            id: this.getId(),
            first_name: "Musti",
            family_name: "Mikkeli",
            birth: {
                type: LifeEventType.BIRTH,
                date: new Date(1993, 1, 1),
                place: {
                    name: "Jyväskylä",
                    latitude: 62.2394501,
                    longitude: 25.7333469,
                }
            },
            parents: [p2.data.id],
        })

        this.persons = [p1, p2, p3];
    }

    getId() {
        this.cur_id++;
        return this.cur_id;
    }

    getData(): Person[] {
        const filtered = this.persons.filter( person => {
            if( person.data.birth == null)
                return false;
            return true;
        })
        return filtered;
    }

}

export { Loader }