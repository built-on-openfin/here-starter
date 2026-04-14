
# How To Create a Search Agent

## Welcome to the Search Agent API How To

This how to provides an example of how to create a search agent that can be used within Enterprise Browser.

You will need to have access to an Enterprise Browser instance and you will need Admin rights so that you can add a search agent.

Instructions on how to configure a search agent can be found here: <https://resources.here.io/docs/guide/admins/agents>.

### Examples

| Example                                                                 | Description                                                                                                                 |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [OpenLibrary Agent](./agents/openlibrary)   | This is a basic search agent that searches open library and lets you launch OpenLibrary web pages inside of Enterprise Browser.  |
| [Interop Agent](./agents/interop)   | This is a basic search agent that searches a JSON Contact Array and can support triggering interop capabilities using the selected result (raising an intent or broadcasting).   |
| [Help Agent](./agents/help)   | This is a basic search agent that searches configured JSON files and uses Fuse.js to return results. It is an example of how you could build a custom help agent if you wanted to provide supporting documentation related to your apps that run within Enterprise Browser.   |
