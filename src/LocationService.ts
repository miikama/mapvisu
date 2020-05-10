import { locationToCoordinate } from './data/locations';
import { Place } from './Person';

export interface queryResult {
    [name: string]: Place
}

class LocationService {

    queryLocations(locationNames: string[]): queryResult {

        let foundPlaces: queryResult = {};

        locationNames.forEach((name) => {

            if (name in locationToCoordinate) {

                const location = locationToCoordinate[name];
                foundPlaces[name] = {
                    name: name,
                    address: location.address,
                    latitude: location.latitude,
                    longitude: location.longitude,
                };
            }
        });

        return foundPlaces;
    }



}


export default new LocationService()