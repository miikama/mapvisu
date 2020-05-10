

import React, { useRef, useEffect } from 'react';
import Timeline from './Timeline';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';

const persons = Timeline.data().graphData();

let counter = 0;

export const GraphComponent = () => {

    const graphRef = useRef<ForceGraphMethods>();

    useEffect(() => {
        const callable = () => {
            graphRef.current?.d3ReheatSimulation();
            counter++;
            if (counter < 3)
                setTimeout(() => {
                    callable();
                }, 50);
        }

        setTimeout(() => {
            callable();
        }, 50)
    }, []);

    return (
        // @ts-ignore (ignoring Type 'ForceGraphMethods | null' is not assignable to type 'ForceGraphMethods')
        <ForceGraph2D ref={graphRef}
            graphData={persons}
            dagLevelDistance={1}
            warmupTicks={50}
            d3AlphaDecay={0.05}
            d3VelocityDecay={0.2}
            nodeRelSize={6}
            linkWidth={4}
        />
    )
}   