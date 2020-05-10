
import React, { FunctionComponent } from 'react';
import { Typography, Box, makeStyles } from "@material-ui/core";
import { Popup } from "react-map-gl";
import { Person } from './Person';


interface PersonPopupProps {
    selectedPerson: Person;
    onPersonSelected: (person: Person | null) => void;
}


const useStyles = makeStyles({
    root: {
        width: 300
    },
    yearLabel: {
        fontWeight: 'bold',
    },
    caption: {
        margin: "3px",
    },
    content: {
        marginTop: "10px",
    }
})

export const PersonPopup: FunctionComponent<PersonPopupProps> = ({ selectedPerson, onPersonSelected }: PersonPopupProps) => {
    const classes = useStyles();
    const lifeString = `${selectedPerson.birthYear() ? selectedPerson.birthYear() : '?'} - ${selectedPerson.deathYear() ? selectedPerson.deathYear() : '?'}`
    const lifeText = <span className={classes.yearLabel}>{lifeString}</span>

    return (
        <Popup
            latitude={selectedPerson.birthLat()}
            longitude={selectedPerson.birthLong()}
            onClose={() => { onPersonSelected(null) }}
        >
            <Box textAlign="left">
                <Typography variant="h5">
                    {selectedPerson.full_name()}
                </Typography>
                <Typography className={classes.caption} variant="caption">
                    {selectedPerson.birthPlace()?.name}, {lifeText}
                </Typography>
                {selectedPerson.infoText().length > 0 ? (
                    <Typography className={classes.content} variant="body2">
                        {selectedPerson.infoText()}
                    </Typography>
                ) : null}

            </Box>
        </Popup>
    )
}      
