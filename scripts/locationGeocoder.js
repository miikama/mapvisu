
const locations = [
    "Alajärvi, Puumala",
    "Lappajärvi, Itäkylä, Sandbacka",
    "USA, North Dakota, Nelson, Pelto",
    "Vimpeli, Itäkylä",
    "Vimpeli",
    "Alajärvi, Paalijärvi, Vähälä",
    "USA, Minnesota, St. Louis, Hibbings",
    "Julistettu kuolleeksi",
    "USA, North Dakota, Brocket",
    "USA, Minnesota, Carlton, Kettle River",
    "Alajärvi",
    "USA, Minnesota, Crisholm",
    "Vimpeli, Itäkylä, Mäkelä",
    "Vimpeli, Itäkylä, Sandbacka",
    "USA, Washington",
    "USA, Kalifornia, Santa Clara",
    "Alajärvi, Paalijärvi",
    "Alajärvi, Kurejoki",
    "Vimpeli, Itäkylä, Rinne",
    "Vimpeli, Sahi, Mäkelä",
    "Vimpeli, Hietoja, Rantatalo",
    "Vimpeli, Hietoja",
    "Vimpeli.",
    "Paltamo",
    "Vimpeli, Lypsinmaa.",
    "Sodankylä",
    "Tampere",
    "Lappajärvi, Itäkylä",
    "Kanada, Ontario, Thunder Bay",
    "Port Arthur, Ontario, Kanada",
    "Lappajärvi, Itäkylä, Pohjoispää",
    "Lappajärvi, Itäkylä, Lamminkoski",
    "Vimpeli, Hallapuro",
    "Lappajärvi, Kivioja",
    "USA, Illinois Winthrop Harbor",
    "Alajärvi, Kurejoki,",
    "Alajärvi, Kurejoki, Anttila.",
    "USA, Wisconsin, Superior",
    "Alajärvi, Kurejoki, Anttila",
    "USA, Minnesota, St. Louis, Chisholm",
    "Alajärvi, Kurejoki, Isoniemi",
    "Sievi, Eskola",
    "Sievi",
    "Sievi, läydettiin kuolleena",
    "Lappajärvi, Itäkylä, Lund",
    "Lappajärvi",
    "Vimpeli, Sääksjärvi",
    "USA, Illinois, Winthrop Harbor",
    "Alajärvi, Ojajärvi",
    "Alajärvi, Mäksy",
    "Alajärvi, Mäksy, Pohjaskangas",
    "Vimpeli, Itäkylä, Lund",
    "USA, Minnesota, Wadena, NYM",
    "USA, North Dakota, Grand Forks, G",
    "USA, Illinois, Cook, Chicago",
    "USA, North Dakota, Cass, Fargo",
    "USA, Oregon, Lane, Florence",
    "USA, Mi0nnesota, Cass, Barnesville",
    "USA, Florida",
    "USA, North Dakota, Cass",
    "USA, Minnesota, Wrigth, Delano",
    "USA, Nort Dakota, Nelson, Pelto",
    "USA, Illinois, Cook, Chigaco",
    "USA, Illinois, Cook, Glenview",
    "USA, Oregon, Multnomah, Portland",
    "USA, Oregon, Clatsop, Astoria",
    "USA, Nort Dakota, Ramsey, Brockett",
    "USA, California",
    "USA, Illinois, Cook, Chigago",
    "USA, North Dakota, Grand Forks",
    "USA",
    "Vimpeli, Itäkylä, Peltotupa",
    "Alajärvi, Norrbacka",
    "Alajärvi, Kaartunen.",
    "Kokkola",
    "Alajärvi, Luoma-aho",
    "Amerikka",
    "Vimpeli, Pyhälahti",
    "Alajärvi, Kaartunen",
    "Alajärvi, Mäksy, Isoketo",
    "USA, Minnesota, Douglas, Yrnass",
    "USA, Minnesota, Silver Township",
    "USA, Minnesota, Douglas, Brandon",
    "USA, Minnesota, Carlton, Moose Lake",
    "USA, Minnesota",
    "USA, Minnesota, Wadena, Menahga",
    "USA, Washington, Pierce, Tacoma",
    "USA, Saint Louis, Duluth",
    "USA, Minnesota, Hennepin, Minneapolis",
    "USA, North Dakota, Walsh, Grafton",
    "USA, Illinois",
    "USA, North Dakota, Ramsey, Devils Lake",
    "USA, Michigan",
    "USA, North Dakota",
    "USA, Minnesota, Duluth",
    "Kanada",
    "USA, Minnesota, French Lake Twp.",
    "Karstula, Kyyjärvi, Kotkaniemi", "Lappajärvi, Itäkylä, Sandbacka",

    "Karstula, Kyyjärvi, Honkalehto",
    "USA Minnesota, Pope",
    "USA, Kalifornia, Chico",
    "USA, Minnesota, St Louis County",
    "Karstula, Kyyjärvi, Hokkala"
];



if (typeof module !== 'undefined' && !module.parent) {

    const https = require('https');

    /**
     *  Querying location info from the Google geocoding API, 
     * 
     * see format specification at https://developers.google.com/maps/documentation/geocoding/start.
     */

    const api_key = process.env.GOOGLE_GEOCODING_API_KEY;
    if (api_key == null) {
        console.error(`Set the Google geocoding api key as an environment variable.
        
e.g. run:

$ export GOOGLE_GEOCODING_API_KEY=your_very_secret_key 
`);

        return;
    }

    //  location_name: {
    //     address: "", longitude: 0, latitude: 0   
    //      }
    let locationCoordinates = {};

    // short_locations = ["Karstula, Kyyjärvi, Hokkala"];

    locations.forEach((current_location) => {

        // console.log(`Querying location for ${current_location}`);

        // build the location query string, different parts should be split by '+'
        const split_location = current_location.split(' ');
        let query_string = "";
        for (let i = 0; i < split_location.length; i++) {
            query_string = query_string + split_location[i];
            if (i !== split_location.length - 1) {
                query_string = query_string + '+';
            }
        }
        // console.log("Built location query string: ", query_string);


        const api_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${query_string}&key=${api_key}`;

        console.log("final query is: ", api_url);

        https.get(api_url, res => {
            res.setEncoding('utf-8');
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                body = JSON.parse(body);
                console.log(body);

                if (body.status !== 'OK') {
                    console.warn("Failed querying location for loc: ", current_location);
                    return;
                }


                // Take the first of the results
                const first_result = body.results[0];

                const location = first_result.geometry.location;
                const formatted_address = first_result.formatted_address;

                console.log("Got location: ", location);
                console.log("Got fancy full address: ", formatted_address);

                locationCoordinates[current_location] = {
                    address: formatted_address,
                    longitude: location.lng,
                    latitude: location.lat,
                };

                console.log(locationCoordinates);

            });

        });

    });





}