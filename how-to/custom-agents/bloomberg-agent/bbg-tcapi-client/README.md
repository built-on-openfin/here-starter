# How To Create a client application that can communicate with the Bloomberg TCAPI Agent

This how to provides an example of how to create a client web app that can be used within Enterprise Browser. It sets up a connection to the Bloomberg TCAPI agent via an app channel.

o run this sample you need to have access to an instance of Enterprise Browser and have the admin rights (or contact someone who does) required to add a Search Agent entry.

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

6. Once the local web server is running it will be accessible from within EB using the url "http://localhost:8080/index.html". Please add this application in EB. Instructions on how to add an application can be found here: <https://resources.here.io/docs/guide/admins/content>.

7. You can now use this sample app to send the Bloomberg TCAPI agent data that it will be able to display on the Bloomberg Terminal.