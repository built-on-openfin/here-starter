# How To Create a Search Agent - .NET

This how to provides an example of how to create a search agent that can be used within Enterprise Browser.

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

5. Once the local web server is running it should be able to serve the search agent you have configured following the instructions found here: <https://resources.here.io/docs/guide/admins/agents>. Upload the agent's json file (`./public/agent-schema.json`) to
   configure the agent in HERE EB.
