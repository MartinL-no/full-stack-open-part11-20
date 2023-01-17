# Bloglist Deployment Pipeline <br />

## Overview

This is an example GutHub Actions deployment pipeline that I created for an app that I had created myself [previously](https://github.com/MartinL-no/full-stack-open/tree/main/part5)

The example app is a full stack JavaScript app with a React frontend and Node.js Express backend. 

From working on the project I learnt about:

- **Setup of CI pipeline to match the development pipeline**
- **Creating GitHub Actions workflows for building, linting and testing the application in the CI pipeline**
- **Configuring deployment workflows for hosting (Fly.io)**
- **Configuring settings for pull requests and defining actions for different branches**
- **Syntax for GitHub Actions YAML files**
- **Using enviroment variables in deployment pipelines**
- **Creating post deployment automated health checks**
- **Configuring system for version numbering**
- **Adding notifications for failed deployments and periodic health checks**


#### [LIVE LINK](https://full-stack-open-part11-20.fly.dev/): (username: testUser, password: testPassword)<br /><br />

## Features

- Github Actions [workflow](https://github.com/MartinL-no/full-stack-open-part11-20/blob/main/.github/workflows/pipeline.yml) for testing, building, version tagging and deploying app to Fly.io

- Configuration [file](https://github.com/MartinL-no/full-stack-open-part11-20/blob/main/fly.toml) for Fly.io deployment with automated health check/ script check of REST end point

- Bash [script](https://github.com/MartinL-no/full-stack-open-part11-20/blob/main/health_check.sh) for checking REST endpoint
