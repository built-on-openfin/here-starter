# Notification Sample

A very simple Java application that raises notifications using the Here Cloud Notification API.

## Prerequisites

- Java 12 or higher
- Maven

## Running the application

### Environment Configuration

All configuration parameters are read from environment variables in a root `.env` file. The application supports both **JWT Authentication** (default) and **Basic Authentication**.

> **Tip:** See `env.example` for a template of all available environment variables. Copy it to `.env` and fill in your actual values.

#### Required Environment Variables

The following variables are always required:
- `NOTIFICATION_SERVER_HOST`: URL of the notification server. Please reach out to Here.io support for this information.
- `SOURCE_ID`: Source identifier (e.g., "server")
- `PLATFORM_ID`: Platform UUID (e.g., "{platform-name-uuid}")

#### Authentication Configuration

Choose one authentication method and configure the appropriate variables:

- `AUTH_TYPE` (optional): Set to `basic` or `jwt` or leave unset (defaults to `jwt`)


**JWT Authentication (Default):**
- `JWT_TOKEN`: Generate a JWT and copy to the env file.
- `JWT_AUTHENTICATION_ID`: Authentication ID for the JWT. Please reach out to Here.io support for this information.

**Basic Authentication:**
- `AUTHENTICATION_BASIC_USERNAME`: Username for basic authentication
- `AUTHENTICATION_BASIC_PASSWORD`: Password for basic authentication

### Building and Running

1. Ensure all required environment variables are set in your `.env` file (see [Environment Configuration](#environment-configuration) above)

2. Run `mvn clean compile` (not sure if `clean` is necessary, but I have been including it)

3. Run `mvn exec:java` with the action as the only command line argument:

**Command format:**
```bash
mvn exec:java -Dexec.mainClass="here.com.example.App" -Dexec.args="[action]"
```

**Arguments:**
- `action` (optional): Action to perform. Defaults to `newNotification` if omitted.

**Available Actions:**
- `newNotification` - Create a new notification (default)
- `updateNotification={notification id}` - Update an existing notification
- `deleteNotification={notification id}` - Delete a notification
- `bulkDeleteNotification={notification id1,notification id2,...}` - Delete multiple notifications (comma-separated IDs)
- `setReminder={notification id}` - Set a reminder for a notification
- `cancelReminder={notification id}` - Cancel a reminder for a notification

**Examples:**
```bash
# Create a new notification (default action)
mvn exec:java -Dexec.mainClass="here.com.example.App"

# Create a new notification (explicit)
mvn exec:java -Dexec.mainClass="here.com.example.App" -Dexec.args="newNotification"

# Update a notification
mvn exec:java -Dexec.mainClass="here.com.example.App" -Dexec.args="updateNotification={notification id}"

# Delete a notification
mvn exec:java -Dexec.mainClass="here.com.example.App" -Dexec.args="deleteNotification={notification id}"

# Bulk delete notifications
mvn exec:java -Dexec.mainClass="here.com.example.App" -Dexec.args="bulkDeleteNotification={notification id1,notification id2,notification id3}"

# Set a reminder
mvn exec:java -Dexec.mainClass="here.com.example.App" -Dexec.args="setReminder={notification id}"

# Cancel a reminder
mvn exec:java -Dexec.mainClass="here.com.example.App" -Dexec.args="cancelReminder={notification id}"
```

**Note:** All connection parameters (sourceId, platformId, authentication type, and credentials) are read from the `.env` file. Only the action is specified as a command line argument.

## Notes

Some refining and refactoring is still needed, but raising and deleting notifications seems to be
working. When updating a notification there is no error message, but during testing the 
notification did not change.  This could be an issue with the parameters or something going on 
in the api; needs more testing/debugging.

### Reminder Functionality

The `setReminder` and `cancelReminder` actions are available in the code, but may not be supported
on all server environments. If you encounter an error like "Cannot POST /notifications/api/publications/events",
this indicates that the reminder endpoint is not available on your server. Please contact Here.io
support to verify if reminder functionality is enabled for your environment.