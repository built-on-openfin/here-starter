![Here Starter](./assets/Here-Starter.png)

> **_:information_source: Here:_** [Here](https://www.here.io) is a commercial product and this repo is for evaluation purposes. Use of Here Core, Enterprise is only granted pursuant to a license from [Here](https://www.here.io) (OpenFin). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation or to discuss a production license.

## Here 8

Here is a full experience offering where an Enterprise Browser UI is made available and is backed by a set of Administrative screens and services. Your own authentication (e.g. Entra, Okta) can be plugged in and you have the ability of creating custom Search Agents for enabling [deep search](https://www.here.io/here-browser/deep-search). This starter will provide examples of how to take advantage of our offering.

[Learn more about Here](https://www.here.io/)

## What version does this branch cover?

This branch covers version **v8.0** of Here (there are versioned branches for other releases).

## Before you get started

Read more about our [recommended development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment).

We recommend:

- Using [Node.Js 20+](https://nodejs.org/en/about/previous-releases)
- Using [RVM 7+](https://developer.openfin.co/versions/?product=RVM) - The RVM should auto update so this applies to environments where a specific RVM version is used.
- Running [OpenFin Health Check](https://cdn.openfin.co/health/deployment/index.html) - Load this page to see if you will be able to install/run Here without issue.
- Installing [OpenFin Process Manager](https://start.openfin.co/pm) - Install the OpenFin process manager application (this will let you debug any issues you might have with running this repo or your changes)
- Cloning this repo using: **git clone <https://github.com/built-on-openfin/here-starter.git> --depth=1** - the main branch will always reflect the latest stable release.
- Opening the root here-starter folder in Visual Studio Code (instead of opening a how-to subfolder directly in Visual Studio Code) - this will give you access to all the samples.
- Running **npm install** from the root folder
- Running **npm run build** from the root folder - this will ensure every sample has all of it's dependencies and builds correctly

## What you can do with this repository

This repository contains examples showing how to configure capabilities made available by the Here offering.

### Enterprise Browser

This section covers examples that can be used to extend the capabilities of Enterprise Browser.

| Example                                                            | Description                                                                                                                                                                                                     |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [How To Create Search Agents](./how-to/create-a-search-agent/)     | This example shows you how to build search agents that can be added to your Enterprise Browser instance through the Admin panels.                                                                                |

### Services

This section covers examples of how to use our Here services.

| Example                                                                 | Description                                                                                                                 |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [How To Use The Entitlements API](./how-to/use-the-entitlements-api/)   | This is a basic example on how to query our services to get the entitlements that are currently configured in our database.  |
| [How To Use The Cloud Notification Service](./how-to/use-notifications-service/)   | This is a collection of examples demonstrating how to manage notifications in the HERE Notification Studio using the Cloud Notification Service API. Included are both Typescript and Java examples.  |
