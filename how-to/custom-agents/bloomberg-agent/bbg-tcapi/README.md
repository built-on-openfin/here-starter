# How To Create an Agent - Bloomberg TCAPI Agent

This how to provides an example of how to create an agent that can be used within Enterprise Browser.

## Running the Sample

To run this sample you need to have access to an instance of Enterprise Browser and have the admin rights (or contact someone who does) required to add a Search Agent entry.

- Clone this repo and follow the instructions below. This will let you customize the sample.

## Getting Started

1. Install the dependencies.

```shell
npm install
```

2. To build your application please run the following command

```shell
npm run build
```

4. Run the application.

```shell
npm run start
```

5. Please ensure that the Bloomberg Terminal is running and that a user is logged into it.

6. Once the local web server is running it should be able to serve the agent you have configured following the instructions found here: <https://resources.here.io/docs/guide/admins/agents>. Upload the agent's json file (`./public/agent-schema.json`) to
   configure the agent in HERE EB.

7. You will need to add an application that permits the Bloomberg TCAPI Agent  - create an application in EB Admin Console with the url of "http://localhost:8181/agent-search-bloomberg-tcapi and ensure that you assign appropriate access. Instructions on how to add an application can be found here: <https://resources.here.io/docs/guide/admins/content>

8. This agent will be used in conjunction with an application that can connect to it on the app channel and send it a mnemonic and some data. The agent will take that information and display it on the Bloomberg Terminal. Please see the bbg-tcapi-client repo for just such an example.
