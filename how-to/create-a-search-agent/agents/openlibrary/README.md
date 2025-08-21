# How To Create a Search Agent - OpenLibrary

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

6. You will need to add an application that permits the OpenLibrary domain (<https://openlibrary.org/>) so that search results can be be launched into Enterprise Browser instead of the standard Desktop Browser. Instructions on how to add an application can be found here: <https://resources.here.io/docs/guide/admins/content>

7. Once you are in Enterprise Browser and you have the search agent running you will be able to see results when you type a query that finds a match e.g. 'charles'.
