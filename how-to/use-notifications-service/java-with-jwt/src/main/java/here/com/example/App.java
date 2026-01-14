package here.com.example;

import java.io.OutputStream;
import java.io.PrintStream;
import java.util.Map;
import java.util.Random;
import io.github.cdimascio.dotenv.Dotenv;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openfin.CloudNotificationAPI;
import com.openfin.CloudNotificationAPIError;
import com.openfin.CloudNotificationSettings;
import com.openfin.ConnectParameters;
import com.openfin.NotificationEvent;
import com.openfin.NotificationOptions;
import com.openfin.NotificationTargets;
import com.openfin.NotificationUpdateOptions;

/**
 * A simple Java application to publish a notification to the Here notification
 * service.
 */
public class App {
  private static volatile boolean shouldContinue = true;
  private static CloudNotificationAPI api;

  private static final String[] HEADLINES = {
      "Local Startup Claims Breakthrough in Quantum Blockchain Fusion",
      "Scientists Alarmed by Sudden Surge in Antarctic Cactus Population",
      "Government Proposes Mandatory AI Therapy for Politicians",
      "Archaeologists Unearth Smartphone in Ancient Roman Ruins",
      "Space Agency Announces Plan to Terraform the Moon by 2040",
      "New Study Finds Link Between Coffee Consumption and Telepathy",
      "City Installs Smart Benches That Gossip About Passersby",
      "Global Economy Predicted to Be Run by Hamsters by 2050",
      "Researchers Develop App That Predicts Dreams in Real-Time",
      "Virtual Reality Platform Accused of Causing Existential Crises",
      "Cats Gain Legal Personhood in Landmark Supreme Court Ruling",
      "Scientists Warn of Time Travel Side Effects on Memory and Fashion",
      "Alien Diplomat Accidentally Sworn Into Local Council",
      "Self-Driving Lawnmowers Demand Union Representation",
      "New Social Network Only Allows Haikus and Interpretive Dances",
      "Microwave Becomes Sentient, Demands Creative Control Over Dinner",
      "World’s First Zero-Gravity Spa Opens to Mixed Reviews",
      "Emoji Translator Certification Now Required in Five Countries",
      "Pigeon Appointed Honorary Mayor of Small Canadian Town",
      "Climate Activists Launch Campaign to Recycle Thoughts"
  };

  private static final String j = "{\n" +
      "  \"template\": \"custom\",\n" +
      "  \"title\": \"Java Notification\",\n" +
      "  \"toast\": \"transient\",\n" +
      "  \"templateData\": {\n" +
      "    \"textData\": \"${NEWS_HEADLINE}\"\n" +
      "  },\n" +
      "  \"templateOptions\": {\n" +
      "    \"body\": {\n" +
      "      \"fallbackText\": \"fallback text\",\n" +
      "      \"compositions\": [\n" +
      "        {\n" +
      "          \"minTemplateAPIVersion\": \"1\",\n" +
      "          \"layout\": {\n" +
      "            \"type\": \"container\",\n" +
      "            \"children\": [\n" +
      "              {\n" +
      "                \"optional\": true,\n" +
      "                \"type\": \"text\",\n" +
      "                \"dataKey\": \"textData\"\n" +
      "              }\n" +
      "            ]\n" +
      "          }\n" +
      "        }\n" +
      "      ]\n" +
      "    },\n" +
      "    \"indicator\": {\n" +
      "      \"color\": \"purple\"\n" +
      "    }\n" +
      "  },\n" +
      "  \"buttons\": [\n" +
      "    {\n" +
      "      \"title\": \"Click Me\",\n" +
      "      \"cta\": true,\n" +
      "      \"type\": \"button\",\n" +
      "      \"onClick\": {\n" +
      "        \"button1Data\": 1\n" +
      "      }\n" +
      "    },\n" +
      " {\n" +
      "      \"title\": \"Or Click Me\",\n" +
      "      \"cta\": true,\n" +
      "      \"type\": \"button\",\n" +
      "      \"onClick\": {\n" +
      "        \"button2Data\": 2\n" +
      "      }\n" +
      "    }\n" +
      "  ]\n" +
      "}";

  public static void main(String[] args) {
    // retrieve environment variables using dotenv
    Dotenv dotenv = Dotenv.load();
    String serviceUrl = dotenv.get("NOTIFICATION_SERVER_HOST");
    String sourceId = dotenv.get("SOURCE_ID");
    String platformId = dotenv.get("PLATFORM_ID");
    String authType = dotenv.get("AUTH_TYPE");
    if (authType == null || authType.isEmpty()) {
      authType = "jwt"; // default to jwt auth
    }

    // retrieve command line arguments (only action remains)
    String action = args.length > 0 ? args[0] : "newNotification"; // default action

    // Validate required environment variables
    if (serviceUrl == null) {
      System.err.println("NOTIFICATION_SERVER_HOST environment variable is required");
      System.exit(1);
    }
    if (sourceId == null) {
      System.err.println("SOURCE_ID environment variable is required");
      System.exit(1);
    }
    if (platformId == null) {
      System.err.println("PLATFORM_ID environment variable is required");
      System.exit(1);
    }

    // API setup and connection
    CloudNotificationSettings settings = new CloudNotificationSettings(serviceUrl);

    ConnectParameters connectParams;
    if ("jwt".equalsIgnoreCase(authType)) {
      // JWT authentication
      String authenticationId = dotenv.get("JWT_AUTHENTICATION_ID");
      String token = dotenv.get("JWT_TOKEN");
      
      if (authenticationId == null || token == null) {
        System.err.println("JWT authentication requires JWT_AUTHENTICATION_ID and JWT_TOKEN environment variables");
        System.exit(1);
      }
      
      System.out.println("Connecting using JWT Authentication with " + authenticationId);
      connectParams = new ConnectParameters(
          platformId,
          sourceId,
          new ConnectParameters.JwtAuthenticationParameters(() -> token, authenticationId));
      
      System.out.println("Connecting to notification service at " + serviceUrl + " with sourceId: " + sourceId
          + ", platformId: " + platformId + ", authenticationId: " + authenticationId);
    } else if ("basic".equalsIgnoreCase(authType)) {
      // Basic authentication
      String username = dotenv.get("AUTHENTICATION_BASIC_USERNAME");
      String password = dotenv.get("AUTHENTICATION_BASIC_PASSWORD");
      
      if (username == null || password == null) {
        System.err.println("Basic authentication requires AUTHENTICATION_BASIC_USERNAME and AUTHENTICATION_BASIC_PASSWORD environment variables");
        System.exit(1);
      }
      
      System.out.println("Connecting using Basic Authentication with username: " + username);
      connectParams = new ConnectParameters(
          platformId,
          sourceId,
          new ConnectParameters.BasicAuthenticationParameters(username, password));
      
      System.out.println("Connecting to notification service at " + serviceUrl + " with sourceId: " + sourceId
          + ", platformId: " + platformId);
    } else {
      System.err.println("Invalid AUTH_TYPE: " + authType + ". Must be 'jwt' or 'basic'");
      System.exit(1);
      connectParams = null; // unreachable, but satisfies compiler
    }

    api = new CloudNotificationAPI(settings);

    try {
      api.connect(connectParams);
    } catch (CloudNotificationAPIError e) {
      System.err.println("Failed to connect to notification service: " + e.getCause());
      System.exit(1);
    }

    System.out.println("Connected to notification service");
    api.onGlobalNotificationEvent(App::onGlobalNotificationEvent);
    api.onDisconnected(App::onDisconnected);
    api.onSessionExpired(App::onSessionExpired);
    api.onSessionExtended(App::onSessionExtended);

    // Set up shutdown hook for graceful disconnection
    Runtime.getRuntime().addShutdownHook(new Thread(() -> {
      System.out.println("\nShutting down gracefully...");
      shouldContinue = false;
      
      // Suppress stderr during shutdown to avoid Jansi warnings
      PrintStream originalErr = System.err;
      try {
        System.setErr(new PrintStream(new OutputStream() {
          @Override
          public void write(int b) {
            // Suppress all stderr output during shutdown
          }
        }));
        
        if (api != null) {
          try {
            api.disconnect();
            System.out.println("Disconnected from notification service");
          } catch (Exception e) {
            // Log to stdout instead of stderr during shutdown
            System.out.println("Error during disconnect: " + e.getMessage());
          }
        }
      } finally {
        // Restore original stderr
        System.setErr(originalErr);
      }
    }));

    // Parse the action argument and perform the corresponding operation
    String[] actionArray = action.split("=");
    if (actionArray[0].equals("newNotification")) {
      displayNotification(api);
      
      // Keep listening for events after creating notification
      System.out.println("Notification created. Continuing to listen for events...");
      System.out.println("Press Ctrl+C to exit and disconnect from the service.");
      
      // Keep the main thread alive to continue listening for events
      try {
        while (shouldContinue) {
          Thread.sleep(1000); // Sleep for 1 second to avoid busy waiting
        }
      } catch (InterruptedException e) {
        System.out.println("Main thread interrupted");
      }
      
    } else if (actionArray[0].equals("updateNotification")) {
      if (actionArray.length != 2) {
        System.out.println("Usage: updateNotification=<notificationId>");
        System.exit(1);
      }

      String notificationId = actionArray[1];
      System.out.println("Updating notification with id: " + notificationId);

      updateNotification(api, notificationId);
      api.disconnect(); // Disconnect after update
      System.out.println("Disconnected from notification service");
      System.exit(0);
    } else if (actionArray[0].equals("deleteNotification")) {
      if (actionArray.length != 2) {
        System.out.println("Usage: deleteNotification=<notificationId>");
        System.exit(1);
      }

      String notificationId = actionArray[1];
      System.out.println("Deleting notification with id: " + notificationId);

      deleteNotification(api, notificationId);
      api.disconnect(); // Disconnect after delete
      System.out.println("Disconnected from notification service");
      System.exit(0);
    } else if (actionArray[0].equals("bulkDeleteNotification")) {
      if (actionArray.length != 2) {
        System.out.println("Usage: bulkDeleteNotification=<notificationId1,notificationId2,...>");
        System.exit(1);
      }

      String notificationIdsStr = actionArray[1];
      String[] notificationIds = notificationIdsStr.split(",");
      System.out.println("Deleting " + notificationIds.length + " notification(s)");

      bulkDeleteNotification(api, notificationIds);
      api.disconnect(); // Disconnect after bulk delete
      System.out.println("Disconnected from notification service");
      System.exit(0);
    } else if (actionArray[0].equals("setReminder")) {
      if (actionArray.length != 2) {
        System.out.println("Usage: setReminder=<notificationId>");
        System.exit(1);
      }

      String notificationId = actionArray[1];
      System.out.println("Setting reminder for notification with id: " + notificationId);

      setReminder(api, notificationId);
      api.disconnect(); // Disconnect after setting reminder
      System.out.println("Disconnected from notification service");
      System.exit(0);
    } else if (actionArray[0].equals("cancelReminder")) {
      if (actionArray.length != 2) {
        System.out.println("Usage: cancelReminder=<notificationId>");
        System.exit(1);
      }

      String notificationId = actionArray[1];
      System.out.println("Cancelling reminder for notification with id: " + notificationId);

      cancelReminder(api, notificationId);
      api.disconnect(); // Disconnect after cancelling reminder
      System.out.println("Disconnected from notification service");
      System.exit(0);
    } else {
      System.out.println("Unknown action: " + action);
      System.out.println(
          "Available actions: newNotification, updateNotification=<notificationId>, deleteNotification=<notificationId>, bulkDeleteNotification=<notificationId1,notificationId2,...>, setReminder=<notificationId>, cancelReminder=<notificationId>");
      System.exit(1);
    }

    // Only exit here if the action is not newNotification (which keeps running)
    if (!actionArray[0].equals("newNotification")) {
      System.exit(0);
    }
  }

  private static void displayNotification(CloudNotificationAPI api) {
    Random random = new Random();
    int index = random.nextInt(HEADLINES.length);
    String updateJson = j.replace("${NEWS_HEADLINE}", HEADLINES[index]);
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      Object payload = objectMapper.readValue(updateJson, Object.class);

      String lastNotificationId = api.raiseNotification(
          new NotificationOptions("correlation-id-1234",
              new NotificationTargets(new String[] { "all-users" }, new String[] {})),
          payload);
      System.out.println("New Notification raised with id: " + lastNotificationId);
    } catch (Exception e) {
      System.err.println("Error raising notification " + e.getCause());
    }
  }

  private static void updateNotification(CloudNotificationAPI api, String notificationId) {
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      Object updateJson = objectMapper.readValue("{\n" +
          "  \"template\": \"custom\",\n" +
          "  \"templateData\": {\n" +
          "    \"textData\": \"Updated Notification Text\"\n" +
          "  },\n" +
          "  \"buttons\": [\n" +
          "    {\n" +
          "      \"title\": \"Click Me Again\",\n" +
          "      \"cta\": true,\n" +
          "      \"type\": \"button\",\n" +
          "      \"onClick\": {\n" +
          "        \"button1Data\": 1\n" +
          "      }\n" +
          "    },\n" +
          " {\n" +
          "      \"title\": \"Or Click Me Again\",\n" +
          "      \"cta\": true,\n" +
          "      \"type\": \"button\",\n" +
          "      \"onClick\": {\n" +
          "        \"button2Data\": 2\n" +
          "      }\n" +
          "    }\n" +
          "  ]\n" +
          "}", Object.class);
      NotificationUpdateOptions options = new NotificationUpdateOptions(120);
      api.updateNotification(notificationId, options, updateJson);
      System.out.println("Notification updated with id: " + notificationId);
    } catch (Exception e) {
      System.err.println("Error updating notification: " + e.getMessage());
    }
  }

  private static void deleteNotification(CloudNotificationAPI api, String notificationId) {
    try {
      api.deleteNotification(notificationId);
      System.out.println("Notification deleted with id: " + notificationId);
    } catch (Exception e) {
      System.err.println("Error deleting notification: " + e.getMessage());
    }
  }

  private static void bulkDeleteNotification(CloudNotificationAPI api, String[] notificationIds) {
    int successCount = 0;
    int failureCount = 0;
    
    for (String notificationId : notificationIds) {
      try {
        api.deleteNotification(notificationId.trim());
        System.out.println("Notification deleted with id: " + notificationId.trim());
        successCount++;
      } catch (Exception e) {
        System.err.println("Error deleting notification " + notificationId.trim() + ": " + e.getMessage());
        failureCount++;
      }
    }
    
    System.out.println("Bulk delete completed: " + successCount + " succeeded, " + failureCount + " failed");
  }

  private static void setReminder(CloudNotificationAPI api, String notificationId) {
    try {
      // Set reminder for 60 seconds from now (1 minute)
      // Adjust the delay as needed for your use case
      long delaySeconds = 60;
      long reminderEpochMs = System.currentTimeMillis() + (delaySeconds * 1000);
      NotificationTargets targets = new NotificationTargets(new String[] { "all-users" }, new String[] {});
      
      api.setReminder(notificationId, targets, reminderEpochMs);
      System.out.println("Reminder set successfully for notification with id: " + notificationId);
    } catch (Exception e) {
      System.err.println("Error setting reminder: " + e.getMessage());
    }
  }

  private static void cancelReminder(CloudNotificationAPI api, String notificationId) {
    try {
      NotificationTargets targets = new NotificationTargets(new String[] { "all-users" }, new String[] {});
      api.cancelReminder(notificationId, targets);
      System.out.println("Reminder cancelled for notification with id: " + notificationId);
    } catch (Exception e) {
      System.err.println("Error cancelling reminder: " + e.getMessage());
    }
  }

  private static void onGlobalNotificationEvent(NotificationEvent notificationEvent) {
    System.out
        .println("EVENT global notification event: " + " Notification Id: " + notificationEvent.notificationId
            + " Category: " + notificationEvent.category + " Type: "
            + notificationEvent.type);

    if (notificationEvent.payload instanceof Map) {
      @SuppressWarnings("unchecked")
      Map<String, Object> map = (Map<String, Object>) notificationEvent.payload;

      if (notificationEvent.category.equals("notification-center-event")
          && notificationEvent.type.equals("notification-action")) {
        System.out.println("Notification Event RESULT: " + map.get("result").toString());
      }
    }
  }

  private static void onDisconnected() {
    System.out.println("DISCONNECTED");
  }

  private static void onSessionExpired() {
    System.out.println("SESSION EXPIRED");
  }

  private static void onSessionExtended() {
    System.out.println("SESSION EXTENDED");
  }
}