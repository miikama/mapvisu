

import React, { FunctionComponent } from 'react';
import { Person } from './Person';
import { VisualiseCommand } from './Timeline';
import TypoGraphy from "@material-ui/core/Typography"
import { createMuiTheme, ThemeProvider, Theme, AppBar, Button, Icon } from '@material-ui/core';


interface HeaderProps {
    currentYear: number;
    theme: Theme;
    height: string;
    controlVisualisation: (command: VisualiseCommand) => void
}

export const MapHeader: FunctionComponent<HeaderProps> = ({ currentYear, theme, height, controlVisualisation}: HeaderProps) => {    

    return  (
        <ThemeProvider theme={theme}>
            <AppBar position="static" style={{height: height, padding: "0.2em"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <TypoGraphy variant="h3">Year {currentYear}</TypoGraphy>                    
                    <Button 
                        color="inherit"                        
                        onClick={ (e) => { controlVisualisation(VisualiseCommand.Start)}}
                    >
                        <Icon>send</Icon>
                    </Button>                    
                    <Button 
                        color="inherit"                        
                        onClick={ (e) => { controlVisualisation(VisualiseCommand.Stop)}}
                    >
                        <Icon>stop</Icon>
                    </Button>                    
                </div>
            </AppBar>
        </ThemeProvider>
    )
}   