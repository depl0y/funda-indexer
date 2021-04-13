# Funda Assignment

My solution to the Funda assignment is 3 parts.
- An index script
- A backend
- A frontend

# Where to start

## Indexer

The indexer is a small script that is written in typescript. This queries the Funda API and collects the required data. My motivation to use typescript in this case is, is that it is very flexible to work with and does not require a lot of setting up to get the required data from the API.

### Dependencies
- **axios** I use axios to perform queries to the API. I love the stability and robustness Axios brings to the table.
- **json2typescript** This library is really powerful in serializing and deserializing data, for example data coming from APIs. It performs checks on the data, you can add custom converters that convert all sorts of different data objects to objects you have available on 'your side' of the project.
- **typescript** Type-safety is key and I will use Typescript over Javascript every time I have the chance.
- **eslint**
Making sure my code is compliant to the styling rules.
- **sqlite** Storage of data is currently in sqlite, mainly because it is portable, does not require a full database server and easy to query.

First thing you want to do is the run the indexer, located conveniently in the `indexer` folder. You can see it's [readme here](indexer/README.md). This indexer will create a sqlite database in de `data` folder.

A database with a table 'realtors' will be created, with the following structure:

| COLUMN | Type | Description |
| - | - | - |
| id | Integer | The id of the realtor |
| name | Text | The name of the realtor |
| objects | Integer | The amount of objects this realtor has in Amsterdam |
| objectsWithGarden | Integer | The amount of objects this realtor has in Amsterdam with a garden |

### Run the indexer

- `npm run prerequisites` This will install ts-node, a dependency needed to let node run Typescript code and also performs an `npm install`.
- `npm run index`

## Backend

For the backend I chose .net core 3.1. A simple C# based project where I created a single controller (`RealtorController`) which is responsible for both the 'Top 10' and the 'Top 10 with Garden' methods.

To access to database created by the indexer, I use a simple EntityFramework model. Because the model does not contain any data I don't want leaked to the outside, I chose to not use a DTO object but just return the `Realtor` class in the methods.

### Run the backend

You want to open up the backend project in Visual Studio (`backend/backend.sln`) and run it. If you leave the folder structure intact, there is no need to update the database path in the `appsettings.json`, but if you encounter errors where the database could not be found. This should probably be the place to start looking.

This will start a backend on port `19428`.

### Dependencies
- **Microsoft.EntityFrameworkCore.Sqlite** Entity Framework support for sqlite.
- **Microsoft.EntityFrameworkCore.Proxies** Support for lazy loading, might be a bit overkill in this project, but nice to have.

## Frontend

For the frontend I used a simple React application, created by the default 'create-react-app' script. As a language I am using Typescript again (for the same reasons as mentioned above).

The project contains 2 custom views responsible for showing the top 10 information and a table with results.

### Dependencies

Some of the dependencies are the same as for the indexer.

- **axios** I use axios to perform queries to the API. I love the stability and robustness Axios brings to the table.
- **json2typescript** This library is really powerful in serializing and deserializing data, for example data coming from APIs. It performs checks on the data, you can add custom converters that convert all sorts of different data objects to objects you have available on 'your side' of the project.
- **typescript** Type-safety is key and I will use Typescript over Javascript every time I have the chance.
- **react, react-dom, react-scripts**
React modules needed to get the base application running

### Run the frontend

In the frontend directory, run the following commands:

- `npm install`
- `npm run start`

This will launch a webserver on localhost:3000 and (most likely) will launch a browser navigating to that page.

# Additional information

- Visual Studio Code was used for the indexer and the frontend.
- Visual Studio 2019 was used for the backend
- While developing this, the album Crossroad from Bon Jovi was playing
- Normally I would use an UI framework like Bootstrap or Material-UI for the frontend as well, where the latter has my preference at the moment. This would only make things heavier than they needed to be for this test.
