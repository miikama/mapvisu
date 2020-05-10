

import React, { FunctionComponent } from 'react';
import { VisualiseCommand } from './Timeline';
import TypoGraphy from "@material-ui/core/Typography"
import { ThemeProvider, Theme, AppBar, Button, Icon } from '@material-ui/core';
import SwapVertIcon from '@material-ui/icons/SwapVert';



interface HeaderProps {
    currentYear: number;
    theme: Theme;
    height: string;
    controlVisualisation: (command: VisualiseCommand) => void
}

export const HeaderComponent: FunctionComponent<HeaderProps> = ({ currentYear, theme, height, controlVisualisation}: HeaderProps) => {    

    return  (
        <ThemeProvider theme={theme}>
            <AppBar position="static" style={{height: height, padding: "0.2em"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <TypoGraphy variant="h3">Year {currentYear}</TypoGraphy>                    
                    <Button 
                        color="inherit"                        
                        onClick={ (e) => { controlVisualisation(VisualiseCommand.Stop)}}
                    >
                        <Icon>stop</Icon>
                    </Button>                    
                    <Button 
                        color="inherit"                        
                        onClick={ (e) => { controlVisualisation(VisualiseCommand.Start)}}
                    >
                        <Icon>send</Icon>
                    </Button>                    
                    <Button 
                        color="inherit"                        
                        onClick={ (e) => { controlVisualisation(VisualiseCommand.ToggleGraphAndMap)}}
                    >
                        <SwapVertIcon />
                        <TypoGraphy variant="body1">Graph/Map</TypoGraphy>                        
                    </Button>                    
                </div>
            </AppBar>
        </ThemeProvider>
    )
}   