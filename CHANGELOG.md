# Changelog

## October 2025

- [create-a-search-agent](./how-to/create-a-search-agent) - Updated the openlibrary
search agent as required by the updates to the cloud-api search agent dependency. 
The following changes were made:
    - Updated the version of `@openfin/cloud-api` in `package.json`
    - Import `Agent` instead of `Search` from `@openfin/cloud-api` in 
    `client/src/index.ts` and adjust logic accordingly to use the new
    Agent functionality.
    - Import `Agent` in addition to `Search` in `client/src/search.ts`,
    replacing `Search.SearchAgentRegistrationConfig` in the init function param
    types with `Agent.AgentRegistrationConfig` and `Search.SearchListenerRequest`
    in the onSearch function paramaters with `Agent.SearchListenerRequest`.
    - `Search.getAgentConfiguration<T>` is replaced by `Agent.getConfiguration<T>`,
    now returing just T, or the type/interface defined to hold the custom fields, 
    rather than other settings such as title, id, etc. For T to be accepted, it 
    must contain `[key: string]: unknown;` as a property (see `SearchAgentConfigData` 
    in `client/src/search.ts`).
    - The init function now returns an object w/ a named `search` property, rather 
    than just returning the search object directly. The previous return value simply
    needed to be wrapped.