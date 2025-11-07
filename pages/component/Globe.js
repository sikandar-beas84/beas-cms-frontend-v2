// components/Globe.js

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const Globe = ({ width = 800, height = 800 }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        // Ensure this runs only on the client side
        if (typeof window !== 'undefined') {
            const svg = d3.select(svgRef.current)
                .attr('width', width)
                .attr('height', height);

            // Adjust projection scale and translate for non-square aspect ratios
            const projection = d3.geoOrthographic()
                .scale(Math.min(width, height) / 2.5)  // Scale based on the smaller dimension
                .translate([width / 2, height / 2])
                .rotate([0, -30]);

            const path = d3.geoPath().projection(projection);

            // Create the globe background
            svg.selectAll('.globe').remove();  // Remove previous globe if any
            svg.append('path')
                .datum({ type: 'Sphere' })
                .attr('class', 'globe')
                .attr('d', path)
                .attr('fill', '#d0f0ff')  // light ocean blue
                .attr('stroke', '#999')  
                .attr('stroke-width', 0.5);

            // Load and display the world map using d3.json
            d3.json('/data/countries-110m.json').then(worldData => {
                //const countries = topojson.feature(worldData, worldData.objects.countries);

                // Convert topojson to geojson
                const geo = topojson.feature(worldData, worldData.objects.countries);

                // Make sure geo.features exists and is an array
                let countries = Array.isArray(geo.features) ? geo.features : [];
                
                svg.selectAll('.country').remove();  // Remove previous countries if any
                svg.selectAll('.country')
                    //.data(countries.features)
                    .data(countries)
                    .enter().append('path')
                    .attr('class', 'country')
                    .attr('d', path)
                    .attr('fill', 'lightgreen')  // Set country fill color to light green
                    .attr('stroke', '#333');  // Set country border color to white
                
                // Add labels only for selected countries
                const labeledCountries = ["India", "United States of America", "Netherlands", "Nigeria", "Bhutan", "South Africa", "China"];
                svg.selectAll('.label').remove();
                svg.selectAll('.label')
                    //.data(countries.features)
                    .data(countries.filter(d => labeledCountries.includes(d.properties.name)))
                    .enter().append('text')
                    .attr('class', 'label')
                    .attr('text-anchor', 'middle')
                    .attr('font-size', 10)
                    .attr('fill', 'red')
                    .attr('transform', d => {
                        const c = path.centroid(d);
                        if (!c || isNaN(c[0]) || isNaN(c[1])) return "translate(-999, -999)"; // hide if invalid
                        return `translate(${c[0]}, ${c[1]})`;
                    })
                    .text(d => d.properties.name);
            });

            // Rotate the globe
            const rotateGlobe = () => {
                d3.timer(() => {
                    projection.rotate([Date.now() * 0.02 % 360, -30]); // Rotate based on time
                    //svg.selectAll('path').attr('d', path);
                    svg.selectAll('.globe').attr('d', path);
                    svg.selectAll('.country').attr('d', path);
                    svg.selectAll('.label')
                        .attr('transform', d => {
                            const c = path.centroid(d);
                            return (!c || isNaN(c[0]) || isNaN(c[1])) ? "translate(-999,-999)" : `translate(${c[0]}, ${c[1]})`;
                        });
                });
            };

            rotateGlobe();

            // Cleanup function to stop any timers on component unmount
            return () => {
                d3.selectAll('path').interrupt();
            };
        }
    }, [width, height]);  // Depend on width and height

    return <svg ref={svgRef}></svg>;
};

export default React.memo(Globe);

// components/Globe.js
// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const Globe = ({ width = 800, height = 800 }) => {
//     const svgRef = useRef(null);

//     useEffect(() => {
//         if (typeof window === 'undefined') return;

//         const svg = d3.select(svgRef.current)
//             .attr('width', width)
//             .attr('height', height)
//             .style('background', 'white');

//         const projection = d3.geoOrthographic()
//             .scale(Math.min(width, height) / 2.1)
//             .translate([width / 2, height / 2])
//             .rotate([0, -30]);

//         const path = d3.geoPath().projection(projection);

//         // Draw ocean sphere
//         svg.append('path')
//             .datum({ type: 'Sphere' })
//             .attr('class', 'globe')
//             .attr('d', path)
//             .attr('fill', '#d0f0ff')
//             .attr('stroke', '#999')
//             .attr('stroke-width', 0.5);

//         // Load GeoJSON
//         d3.json('/data/countries.geo.json')
//             .then(data => {
//                 console.log('Loaded countries:', data.features.length);

//                 // Draw countries
//                 svg.selectAll('.country')
//                     .data(data.features)
//                     .enter().append('path')
//                     .attr('class', 'country')
//                     .attr('d', path)
//                     .attr('fill', '#cccccc')
//                     .attr('stroke', '#333')
//                     .attr('stroke-width', 0.5);

//                 // Add labels (initially invisible)
//                 svg.selectAll('.label')
//                     .data(data.features)
//                     .enter().append('text')
//                     .attr('class', 'label')
//                     .attr('text-anchor', 'middle')
//                     .attr('font-size', 8)
//                     .attr('fill', 'black')
//                     .style('pointer-events', 'none')
//                     .text(d => d.properties.name);

//                 // Rotation animation
//                 const timer = d3.timer((elapsed) => {
//                     projection.rotate([elapsed * 0.02, -30]);

//                     // Update paths
//                     svg.selectAll('.globe').attr('d', path);
//                     svg.selectAll('.country').attr('d', path);

//                     // Update label positions & visibility
//                     svg.selectAll('.label')
//                         .attr('transform', d => {
//                             const c = path.centroid(d);
//                             return `translate(${c[0]}, ${c[1]})`;
//                         })
//                         .style('opacity', d => {
//                             const center = projection.invert([width / 2, height / 2]); // center lat/long
//                             const centroid = d3.geoCentroid(d);
//                             return d3.geoDistance(center, centroid) < Math.PI / 2 ? 1 : 0; // visible if front-facing
//                         });
//                 });

//                 return () => timer.stop();
//             })
//             .catch(err => console.error('Error loading country names:', err));

//     }, [width, height]);

//     return <svg ref={svgRef}></svg>;
// };

// export default Globe;
