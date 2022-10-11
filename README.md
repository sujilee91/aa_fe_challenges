# AgentAnalytics Frontend Code Challenge 👩‍💻

This repository is created and prepared for Agentanalytics by [SuJi Lee](https://github.com/sujilee91), and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project contains a simple app that displays the weather in three cities of my choice: Calgary, Seoul, and Munich.

## Requirements

- Build with React
- Fully functional and all weather is retrieved in real-time
- Properly deploy to a hosting service
- All UI elements respond appropriately to user actions
- Host code in a public repository, like Github.com

## Details

### API

openweathermap API - 5days 3hours data

### Mockup implementation

As AgentAnalytics provided mockup image size in 2536px \* 1368px, base style of application is implemented for 2536px and my personal laptop size(1440px).

To see the best result of UI implementation, please make sure to set the width of your browser to 2536px OR 1440px.

All weathers are presented by icon asset (asset/weather.svg), from [Orion Icon Pack](https://orioniconlibrary.com/icon-pack/weather?style=color).

### Deploy to server

This project has been deployed using Vercel.\
Please check link [HERE](https://aa-challenges.vercel.app/).

### Responsiveness

This app is fully responsive from a minimum of 351 pixels.
Here are the breakpoints I have used:

- Mobile: 351px ~
- Tablet: 721px ~
- Desktop: 961px ~
- Large: > 1441px

### Future Improvement

Currently, weather data will be fetched when a non-selected city name is clicked, which can make unnecessary API calls if the user clicks city names back and forth within a few minutes.

This issue can be improved by letting data be fetched again only when a specific time has passed from the last call for each city.

## Tech / resources

- openweathermap API - 5days 3hours data
- ReactJS
- Typescript
- Less
- MomentJS
- react-testing-library
- Orion Icon pack

## Available Scripts

If you are pulling this project and run in your machine:
In the project directory, run:

### `yarn start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `yarn test`

Will show the test results to your terminal
