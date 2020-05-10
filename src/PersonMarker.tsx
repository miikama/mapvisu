import React, { FunctionComponent } from 'react';
import { Person } from './Person';


interface PersonProps {
    person: Person;
    onPersonSelected: (person: Person) => void;
}

export const PersonMarker: FunctionComponent<PersonProps> = ({ person, onPersonSelected }: PersonProps) => {
    const levelString = "person-marker ancestry" + (person.ancestryLevel() % 9 + 1);
    return (
        <div
            className={levelString}
            onClick={(e) => {
                e.preventDefault();
                onPersonSelected(person);
            }}
        >
        </div>
    )
}   