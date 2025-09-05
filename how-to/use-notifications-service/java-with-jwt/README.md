# Notification Sample

A very simple Java application that raises notifications using the Here Cloud Notification API.

## Prerequisites

- Java 12 or higher
- Maven

## Running the application

1. Ensure the following variables are defined in a root `.env` file:
    - NOTIFICATION_SERVER_HOST: URL of the notification server. Please reach out to Here.io support for this information.
    - JWT_TOKEN: Generate a JWT and copy to the env file.
    - JWT_AUTHENTICATION_ID: Authentication ID for the JWT. Please reach out to Here.io support for this information.
    - PROXY_HOST
    - PROXY_PORT
    - PROXY_USER
    - PROXY_PASSWORD

2. Run `mvn clean compile` (not sure if `clean` is necessary, but I have been including it)

3. Run `mvn exec:java` with the appropriate args:

```bash
mvn exec:java -Dexec.mainClass="here.com.example.App" -Dexec.args="server {platform-name-uuid} newNotification"
mvn exec:java -Dexec.mainClass="here.com.example.App" -Dexec.args="server {platform-name-uuid} updateNotification={notification id}"
mvn exec:java -Dexec.mainClass="here.com.example.App" -Dexec.args="server {platform-name-uuid} deleteNotification={notification id}"

```

## Notes

Some refining and refactoring is still needed, but raising and deleting notifications seems to be
working. When updating a notification there is no error message, but during testing the 
notification did not change.  This could be an issue with the parameters or something going on 
in the api; needs more testing/debugging.