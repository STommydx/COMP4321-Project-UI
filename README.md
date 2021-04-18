# COMP 4321 Project UI

The project is the course project for the HKUST COMP 4321 course. It is a web search engine based on vector space model and powered by RocksDB.

This repository contains the optional UI component of the project. It gives a nice interactive user interface for the users to interact with the search engine.

## Installation Guide

### Prerequisite

#### Node.js

The project is created with `create-react-web`. To setup the dependencies for building the app, the yarn package manager needs to be set up. Please refer to the [yarn website](https://classic.yarnpkg.com/en/docs/install) for setup instructions.

#### Static Web Server

To serve the UI website, you will need a static web server to serve the files. Moreover, it should be able to proxy requests to support API calls to the backend JSP web server. We recommend using nginx for this purpose.

### Building

#### Dependency Management

Our project uses yarn package manager for dependency management. You should first install all dependencies by the following command.

```bash
yarn install
```

#### Building the UI

To build the static web pages, you may use the `build` script in `react-create-app`. The resulting pages will be stored in the `./build` folder.

```bash
yarn build
```

### Deploying the UI

#### Setting up the Static Web Server

You may setup any of the static web server of your preference. Copy all the build files to the web server directory for serving. The below command assumes the files in `/usr/share/nginx/html` are served as the root.

```bash
cp -r ./build/. /usr/share/nginx/html
```

You may load the home page to verify your setup.

#### Linking the Backend API

For the actual search functionality, you need to setup proxy to point all `/api` requests to the backend JSP server. For example, if you are using nginx, you may want to setup like the config below (assume backend is deployed at port `3001`).

```
server {
    location /api {
        proxy_pass	http://localhost:3001;
    }
}
```

Please refer to the main project README.md document for setting up the JSP server.

### Developing the UI

#### Live Preview

To start a development server, you may use the `start` script. It will monitor any source code change and reflect in the web instantly.

```bash
yarn start
```

#### API Proxy

To link the backend JSP server, you can configure the proxy in `package.json`.

```json
{
  "proxy": "http://localhost:3001"
}
```

For more details, please refer to the [documentation](https://create-react-app.dev/docs/proxying-api-requests-in-development) in `create-react-app`.

## Contribution Guidelines

### Cloning the project

The project work best with the Intellij IDEA Ultimate. To import the project in IDEA:

1. Choose `Get from Version Control`
2. Choose GitHub
3. Login GitHub
4. Select this repository `COMP4321-Project-UI`
5. Click clone!
6. Open the project
7. Wait for a little bit. IDEA should import the project automatically. ;)

Of course, you can clone the project via the command line if you prefer.

### Submitting Code Changes

The project would not be successful without your contribution!

#### Creating New Branch

Follow the steps to create a new feature:

1. VCS -> Git -> Branches
2. New Branch
3. Name your branch as `feature/yourfeaturename`
4. Make awesome changes to the code!
5. Commit your changes using VCS -> Commit, remember to stage your changes and make a nice commit message

#### Cleaning Up

Before submitting, you should clean up your work:

1. Switch to `master` branch, do a pull to update to the latest changes
2. Switch back to `feature/yourfeaturename`, run a rebase with master
3. Resolve conflicts if needed, seek help if you don't know how to do so

#### Creating Pull Request

Lastly push the branch to GitHub and create a PR:

1. VCS -> Git -> Push Branch `feature/yourfeaturename`
2. Go to GitHub and create a pull request
3. Set the source as `feature/yourfeaturename` and merge into `master`
4. Wait for the approval!

Refer to the following 2 links for more details on the PR workflow:

1. [GitHub Standard Fork & Pull Request Workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962)
2. [Pull Requests | Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/making-a-pull-request)

### Who do I talk to?

Please contact the repo owner Tommy LI in case you have any questions. Feel free to have a chat on other misc stuffs too!
