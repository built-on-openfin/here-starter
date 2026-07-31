![Here Starter](../assets/Here-Starter.png)

> **_:information_source: Here:_** [Here](https://www.here.io) is a commercial product and this repo is for evaluation purposes. Use of Here Core, Enterprise is only granted pursuant to a license from [Here](https://www.here.io) (OpenFin). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation or to discuss a production license.

## Here Enterprise Browser Quickstart

## What version does this branch cover?

This branch covers version **v14.0** of Here (there are versioned branches for other releases).

## Before you get started

Read more about our [recommended development environment](https://developers.openfin.co/of-docs/docs/set-up-your-dev-environment).

We recommend:

- Using [Node.Js 20+](https://nodejs.org/en/about/previous-releases)
- Using [RVM 7+](https://developer.openfin.co/versions/?product=RVM) - The RVM should auto update so this applies to environments where a specific RVM version is used.
- Running [OpenFin Health Check](https://cdn.openfin.co/health/deployment/index.html) - Load this page to see if you will be able to install/run Here without issue.
- Installing [OpenFin Process Manager](https://start.openfin.co/pm) - Install the OpenFin process manager application (this will let you debug any issues you might have with running this repo or your changes)
- Cloning this repo using: **git clone <https://github.com/built-on-openfin/here-starter.git> --depth=1** - the ```main``` branch will always reflect the latest stable release.
- Opening the root here-starter folder in Visual Studio Code (instead of opening a how-to subfolder directly in Visual Studio Code) - this will give you access to all the samples.
- Running **npm install** from the root folder
- Running **npm run build** from the root folder - this will ensure every sample has all of it's dependencies and builds correctly

## What you can do with this repository

The Quickstart example is intended to be used to guide new users and help them understand the capabilities that are extended to the web application that are added to HERE Enterprise Browser. It includes a basic web application that allows for you test and see the code behind common FDC3 usage such as listening, broadcasting, and using intents.  It also shows how easy it is to import our ```@openfin/notifications``` package to begin to send out alerts from your application with the Enterprise Browser.  Secondly, it includes the basic template to build your own Custom Search Agent, which will attach to the Browser at startup and allow you to start brining in results from any endpoint you might have.

You have 2 options when using this Quickstart:

1. Pull this repository directly from GitHub, and build the projects yourself, adding your own custom code to the examples for testing or Proofs of Concept.
2. Point your LLM of choice to the [quickstart-prompt.md](./quickstart-prompt.md) file provided in this repository to have the project built for you.
