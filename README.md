# harmonized-system-extension

A Chrome extension for searching and displaying HS Code descriptions and rates.

## How to install

1. Run `yarn install`
2. Run `yarn build`
3. Go to [chrome://extensions/](chrome://extensions/)
4. Turn on developer mode in the top right
5. Click "Load Unpacked" in the top left
6. Select the `dist` folder in this project

## How to refresh once you have made code changes

### Method 1

1. Run `yarn build`
2. Click the refresh button for the extension in [chrome://extensions/](chrome://extensions/)

### Method 2

1. Run `yarn build`
2. Click the "remove" button for the extension in [chrome://extensions/](chrome://extensions/)
3. Click "Load Unpacked" in the top left
4. Select the `dist` folder in this project

## How to run the server

1. Make an .env file in `/src/server` file
2. Populate it with an OpenAI API key. Example: `OPENAI_API_KEY=your_api_key`
3. Run `yarn server`
4. To refresh changes, quit and rerun `yarn server`
