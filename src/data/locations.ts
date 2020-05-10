type LocationResult = {
    [name: string]: {
        address: string,
        longitude: number,
        latitude: number,
    }
}

export const locationToCoordinate: LocationResult = {
    Tampere: {
        address: 'Tampere, Finland',
        longitude: 23.7609535,
        latitude: 61.4977524
    },
    'Karstula, Kyyjärvi, Hokkala': {
        address: '43500 Karstula, Finland',
        longitude: 24.8009317,
        latitude: 62.87776359999999
    },
    Paltamo: {
        address: '88300 Paltamo, Finland',
        longitude: 27.8381469,
        latitude: 64.403043
    },
    'Sodankylä': {
        address: '99600 Sodankylä, Finland',
        longitude: 26.5889726,
        latitude: 67.415999
    },
    'Alajärvi, Mäksy, Pohjaskangas': {
        address: '62900 Alajärvi, Finland',
        longitude: 23.8159264,
        latitude: 63.0001054
    },
    Vimpeli: {
        address: '62800 Vimpeli, Finland',
        longitude: 23.8282368,
        latitude: 63.16455649999999
    },
    Kokkola: {
        address: 'Kokkola, Finland',
        longitude: 23.1250337,
        latitude: 63.8415002
    },
    'Lappajärvi, Itäkylä': {
        address: '62660 Itäkylä, Finland',
        longitude: 23.7365876,
        latitude: 63.2293902
    },
    'Alajärvi': {
        address: '62900 Alajärvi, Finland',
        longitude: 23.8159264,
        latitude: 63.0001054
    },
    'Vimpeli.': {
        address: '62800 Vimpeli, Finland',
        longitude: 23.8282368,
        latitude: 63.16455649999999
    },
    'USA, Washington': {
        address: 'Washington, USA',
        longitude: -120.7401385,
        latitude: 47.7510741
    },
    'Kanada, Ontario, Thunder Bay': {
        address: 'Thunder Bay, ON, Canada',
        longitude: -89.2476823,
        latitude: 48.3808951
    },
    'USA, North Dakota, Cass': {
        address: 'Cass County, ND, USA',
        longitude: -97.12155790000001,
        latitude: 47.071168
    },
    'Vimpeli, Pyhälahti': {
        address: '62840 Pyhälahti, Finland',
        longitude: 23.7775788,
        latitude: 63.0941096
    },
    'Lappajärvi, Itäkylä, Sandbacka': {
        address: '62660 Itäkylä, Finland',
        longitude: 23.7365876,
        latitude: 63.2293902
    },
    'Vimpeli, Itäkylä, Sandbacka': {
        address: '62800 Vimpeli, Finland',
        longitude: 23.8282368,
        latitude: 63.16455649999999
    },
    'Vimpeli, Itäkylä, Mäkelä': {
        address: '62800 Vimpeli, Finland',
        longitude: 23.8282368,
        latitude: 63.16455649999999
    },
    'Vimpeli, Itäkylä': {
        address: '62800 Vimpeli, Finland',
        longitude: 23.8282368,
        latitude: 63.16455649999999
    },
    'Vimpeli, Itäkylä, Lund': {
        address: '62800 Vimpeli, Finland',
        longitude: 23.8282368,
        latitude: 63.16455649999999
    },
    'USA, Illinois Winthrop Harbor': {
        address: 'Winthrop Harbor, IL, USA',
        longitude: -87.8236841,
        latitude: 42.4789097
    },
    'Vimpeli, Sahi, Mäkelä': {
        address: '62800 Vimpeli, Finland',
        longitude: 23.8282368,
        latitude: 63.16455649999999
    },
    'Alajärvi, Mäksy, Isoketo': {
        address: '62900 Alajärvi, Finland',
        longitude: 23.8159264,
        latitude: 63.0001054
    },
    'USA, North Dakota, Grand Forks': {
        address: 'Grand Forks, ND, USA',
        longitude: -97.0328547,
        latitude: 47.9252568
    },
    'USA, Minnesota, Silver Township': {
        address: 'Silver Township, MN, USA',
        longitude: -92.8639259,
        latitude: 46.4612561
    },
    'USA, Illinois, Cook, Chicago': {
        address: 'Chicago, IL, USA',
        longitude: -87.6297982,
        latitude: 41.8781136
    },
    'USA, Florida': {
        address: 'Florida, USA',
        longitude: -81.5157535,
        latitude: 27.6648274
    },
    'Lappajärvi, Kivioja': {
        address: 'Kivioja, 62600 Lappajärvi, Finland',
        longitude: 23.6253027,
        latitude: 63.2326734
    },
    'Alajärvi, Paalijärvi, Vähälä': {
        address: '62900 Alajärvi, Finland',
        longitude: 23.8159264,
        latitude: 63.0001054
    },
    'Vimpeli, Hietoja, Rantatalo': {
        address: '62800 Vimpeli, Finland',
        longitude: 23.8282368,
        latitude: 63.16455649999999
    },
    'Vimpeli, Hallapuro': {
        address: '62810 Hallapuro, Finland',
        longitude: 24.1124329,
        latitude: 63.1862475
    },
    'Alajärvi, Paalijärvi': {
        address: '62950 Paalijärvi, Finland',
        longitude: 23.9090751,
        latitude: 63.0620569
    },
    'USA, Minnesota, Carlton, Moose Lake': {
        address: 'Moose Lake, MN 55767, USA',
        longitude: -92.7666667,
        latitude: 46.4513889
    },
    'USA, Illinois, Winthrop Harbor': {
        address: 'Winthrop Harbor, IL, USA',
        longitude: -87.8236841,
        latitude: 42.4789097
    },
    'Alajärvi, Mäksy': {
        address: '62900 Alajärvi, Finland',
        longitude: 23.8159264,
        latitude: 63.0001054
    },
    'USA, California': {
        address: 'California, USA',
        longitude: -119.4179324,
        latitude: 36.778261
    },
    'USA, Minnesota, St Louis County': {
        address: 'St Louis County, MN, USA',
        longitude: -92.3623921,
        latitude: 47.7395106
    },
    'Karstula, Kyyjärvi, Kotkaniemi': {
        address: '43500 Karstula, Finland',
        longitude: 24.8009317,
        latitude: 62.87776359999999
    },
    'USA, Illinois, Cook, Glenview': {
        address: 'Glenview, IL, USA',
        longitude: -87.8223368,
        latitude: 42.0778065
    },
    'USA, North Dakota, Brocket': {
        address: 'Brocket, ND 58321, USA',
        longitude: -98.35704989999999,
        latitude: 48.2130558
    },
    'Alajärvi, Puumala': {
        address: '62900 Alajärvi, Finland',
        longitude: 23.8159264,
        latitude: 63.0001054
    },
    'Lappajärvi, Itäkylä, Lund': {
        address: '62660 Itäkylä, Finland',
        longitude: 23.7365876,
        latitude: 63.2293902
    },
    'USA, Oregon, Lane, Florence': {
        address: 'Florence, OR 97439, USA',
        longitude: -124.099841,
        latitude: 43.9826214
    },
    'USA, North Dakota, Ramsey, Devils Lake': {
        address: 'Devils Lake, ND 58301, USA',
        longitude: -98.86512019999999,
        latitude: 48.112779
    },
    'Vimpeli, Itäkylä, Peltotupa': {
        address: '62800 Vimpeli, Finland',
        longitude: 23.8282368,
        latitude: 63.16455649999999
    },
    'Alajärvi, Kurejoki, Isoniemi': {
        address: '62900 Alajärvi, Finland',
        longitude: 23.8159264,
        latitude: 63.0001054
    },
    'USA, Minnesota': {
        address: 'Minnesota, USA',
        longitude: -94.6858998,
        latitude: 46.729553
    },
    'USA, Oregon, Clatsop, Astoria': {
        address: 'Astoria, OR 97103, USA',
        longitude: -123.8312534,
        latitude: 46.1878841
    },
    'USA, Minnesota, Hennepin, Minneapolis': {
        address: 'Minneapolis, MN, USA',
        longitude: -93.2650108,
        latitude: 44.977753
    },
    'Vimpeli, Sääksjärvi': {
        address: '62880 Sääksjärvi, Finland',
        longitude: 23.971267,
        latitude: 63.220856
    },
    'USA, Minnesota, St. Louis, Chisholm': {
        address: 'Chisholm, MN 55719, USA',
        longitude: -92.88379599999999,
        latitude: 47.4890971
    },
    'Lappajärvi': {
        address: 'Lappajärvi, Finland',
        longitude: 23.6299085,
        latitude: 63.224819
    },
    'USA, Illinois': {
        address: 'Illinois, USA',
        longitude: -89.3985283,
        latitude: 40.6331249
    },
    'USA, Minnesota, Carlton, Kettle River': {
        address: 'Kettle River, MN, USA',
        longitude: -92.8796819,
        latitude: 46.48733439999999
    },
    'USA, Washington, Pierce, Tacoma': {
        address: 'Tacoma, WA, USA',
        longitude: -122.4442906,
        latitude: 47.2528768
    },
    USA: {
        address: 'United States',
        longitude: -95.712891,
        latitude: 37.09024
    },
    'USA, North Dakota': {
        address: 'North Dakota, USA',
        longitude: -101.0020119,
        latitude: 47.5514926
    },
    'Alajärvi, Norrbacka': {
        address: '62900 Alajärvi, Finland',
        longitude: 23.8159264,
        latitude: 63.0001054
    },
    'Vimpeli, Lypsinmaa.': {
        address: 'Lypsinmaa, Finland',
        longitude: 23.767906,
        latitude: 63.16739019999999
    },
    'Lappajärvi, Itäkylä, Pohjoispää': {
        address: '62660 Itäkylä, Finland',
        longitude: 23.7365876,
        latitude: 63.2293902
    },
    'Vimpeli, Itäkylä, Rinne': {
        address: 'Patruunantie 15, 62800 Vimpeli, Finland',
        longitude: 23.8228772,
        latitude: 63.161344
    },
    'Sievi, Eskola': {
        address: '85410 Sievi, Finland',
        longitude: 24.5144506,
        latitude: 63.90604129999999
    },
    'USA, Wisconsin, Superior': {
        address: 'Superior, WI, USA',
        longitude: -92.10407959999999,
        latitude: 46.7207737
    },
    'USA, North Dakota, Walsh, Grafton': {
        address: 'Grafton, ND 58237, USA',
        longitude: -97.410634,
        latitude: 48.4122107
    },
    'Sievi, läydettiin kuolleena': {
        address: '85410 Sievi, Finland',
        longitude: 24.5144506,
        latitude: 63.90604129999999
    },
    'Alajärvi, Kaartunen.': {
        address: '62900 Kaartunen, Finland',
        longitude: 23.785189,
        latitude: 63.0638047
    },
    'USA, Minnesota, Wadena, Menahga': {
        address: 'Menahga, MN 56464, USA',
        longitude: -95.10000339999999,
        latitude: 46.7494921
    },
    'USA, Illinois, Cook, Chigago': {
        address: 'Chicago, IL, USA',
        longitude: -87.6297982,
        latitude: 41.8781136
    },
    'Alajärvi, Kaartunen': {
        address: '62900 Kaartunen, Finland',
        longitude: 23.785189,
        latitude: 63.0638047
    },
    'USA, North Dakota, Nelson, Pelto': {
        address: 'Pelto, ND 58321, USA',
        longitude: -98.22788039999999,
        latitude: 48.1586092
    },
    'Alajärvi, Kurejoki,': {
        address: '62710 Kurejoki, Finland',
        longitude: 23.7042695,
        latitude: 63.00144229999999
    },
    'Alajärvi, Ojajärvi': {
        address: 'Ojajärvi, Alajärvi, Finland',
        longitude: 23.8322694,
        latitude: 63.063669
    },
    'Karstula, Kyyjärvi, Honkalehto': {
        address: 'Honkalehto, 43700 Kyyjärvi, Finland',
        longitude: 24.5986527,
        latitude: 63.0358926
    },
    'USA, Minnesota, Duluth': {
        address: 'Duluth, MN, USA',
        longitude: -92.1004852,
        latitude: 46.78667189999999
    },
    Sievi: {
        address: '85410 Sievi, Finland',
        longitude: 24.5144506,
        latitude: 63.90604129999999
    },
    'Alajärvi, Luoma-aho': {
        address: '62830 Luoma-aho, Finland',
        longitude: 23.8549754,
        latitude: 63.09012929999999
    },
    Amerikka: {
        address: 'North America',
        longitude: -105.2551187,
        latitude: 54.5259614
    },
    'Vimpeli, Hietoja': {
        address: '62860 Hietoja, Finland',
        longitude: 23.7729127,
        latitude: 63.18987299999999
    },
    'Lappajärvi, Itäkylä, Lamminkoski': {
        address: '62660 Lamminkoski, Finland',
        longitude: 23.7846786,
        latitude: 63.2472067
    },
    'USA, Michigan': {
        address: 'Michigan, USA',
        longitude: -85.60236429999999,
        latitude: 44.3148443
    },
    Kanada: {
        address: 'Canada',
        longitude: -106.346771,
        latitude: 56.130366
    },
    'USA, Kalifornia, Santa Clara': {
        address: 'Santa Clara, CA, USA',
        longitude: -121.9552356,
        latitude: 37.3541079
    },
    'USA Minnesota, Pope': {
        address: 'Pope County, MN, USA',
        longitude: -95.4363717,
        latitude: 45.5472257
    },
    'Alajärvi, Kurejoki': {
        address: '62710 Kurejoki, Finland',
        longitude: 23.7042695,
        latitude: 63.00144229999999
    },
    'Port Arthur, Ontario, Kanada': {
        address: 'Thunder Bay, ON, Canada',
        longitude: -89.2476823,
        latitude: 48.3808951
    },
    'USA, Nort Dakota, Nelson, Pelto': {
        address: 'Pelto, ND 58321, USA',
        longitude: -98.22788039999999,
        latitude: 48.1586092
    },
    'USA, Minnesota, Wrigth, Delano': {
        address: 'Delano, MN 55328, USA',
        longitude: -93.7891331,
        latitude: 45.0419073
    },
    'USA, Minnesota, Wadena, NYM': {
        address: 'New York Mills, MN 56567, USA',
        longitude: -95.37614649999999,
        latitude: 46.518016
    },
    'USA, Minnesota, St. Louis, Hibbings': {
        address: 'Hibbing, MN, USA',
        longitude: -92.9376887,
        latitude: 47.42715459999999
    },
    'USA, Minnesota, French Lake Twp.': {
        address: 'French Lake Township, MN, USA',
        longitude: -94.21277359999999,
        latitude: 45.2031128
    },
    'USA, Minnesota, Crisholm': {
        address: 'Chisholm, MN 55719, USA',
        longitude: -92.88379599999999,
        latitude: 47.4890971
    },
    'USA, Kalifornia, Chico': {
        address: 'Chico, CA, USA',
        longitude: -121.8374777,
        latitude: 39.7284944
    },
    'USA, Minnesota, Douglas, Yrnass': {
        address: 'Minnesota, USA',
        longitude: -94.6858998,
        latitude: 46.729553
    },
    'USA, Saint Louis, Duluth': {
        address: 'Duluth, MN, USA',
        longitude: -92.1004852,
        latitude: 46.78667189999999
    },
    'USA, Oregon, Multnomah, Portland': {
        address: 'Multnomah, Portland, OR 97219, USA',
        longitude: -122.7128749,
        latitude: 45.4671572
    },
    'USA, Nort Dakota, Ramsey, Brockett': {
        address: 'Brocket, ND 58321, USA',
        longitude: -98.35704989999999,
        latitude: 48.2130558
    },
    'USA, Illinois, Cook, Chigaco': {
        address: 'Chicago, IL, USA',
        longitude: -87.6297982,
        latitude: 41.8781136
    },
    'USA, Minnesota, Douglas, Brandon': {
        address: 'Brandon, MN 56315, USA',
        longitude: -95.5986557,
        latitude: 45.9652386
    },
    'USA, Mi0nnesota, Cass, Barnesville': {
        address: 'Barnesville, MN 56514, USA',
        longitude: -96.42001259999999,
        latitude: 46.6533237
    },
    'USA, North Dakota, Cass, Fargo': {
        address: 'Fargo, ND, USA',
        longitude: -96.7898034,
        latitude: 46.8771863
    },
    'USA, North Dakota, Grand Forks, G': {
        address: 'Grand Forks, ND, USA',
        longitude: -97.0328547,
        latitude: 47.9252568
    }
};