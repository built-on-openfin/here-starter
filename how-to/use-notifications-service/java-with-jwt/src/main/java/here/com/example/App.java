package here.com.example;

import java.util.Map;
import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
  private static final Logger logger = LoggerFactory.getLogger(App.class);

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
    String authenticationId = dotenv.get("JWT_AUTHENTICATION_ID");
    String token = dotenv.get("JWT_TOKEN");

    // retrieve command line arguments
    String sourceId = args[0];
    String platformId = args[1];
    String action = args.length > 2 ? args[2] : "newNotification";

    // API setup and connection
    CloudNotificationSettings settings = new CloudNotificationSettings(serviceUrl);

    System.out.println("Connecting using JWT Authentication with " + authenticationId);
    ConnectParameters connectParams = new ConnectParameters(
        platformId,
        sourceId,
        new ConnectParameters.JwtAuthenticationParameters(() -> token, authenticationId));

    CloudNotificationAPI api = new CloudNotificationAPI(settings);

    System.out.println("Connecting to notification service at " + serviceUrl + " with sourceId: " + sourceId
        + ", platformId: " + platformId + ", authenticationId: " + authenticationId);

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

    // Parse the action argument and perform the corresponding operation
    String[] actionArray = action.split("=");
    if (actionArray[0].equals("newNotification")) {
      displayNotification(api);
    } else if (actionArray[0].equals("updateNotification")) {
      if (actionArray.length != 2) {
        System.out.println("Usage: updateNotification=<notificationId>");
        System.exit(1);
      }

      String notificationId = actionArray[1];
      System.out.println("Updating notification with id: " + notificationId);

      updateNotification(api, notificationId);
    } else if (actionArray[0].equals("deleteNotification")) {
      if (actionArray.length != 2) {
        System.out.println("Usage: deleteNotification=<notificationId>");
        System.exit(1);
      }

      String notificationId = actionArray[1];
      System.out.println("Deleting notification with id: " + notificationId);

      deleteNotification(api, notificationId);
    } else {
      System.out.println("Unknown action: " + action);
      System.out.println(
          "Available actions: newNotification, updateNotification=<notificationId>, deleteNotification=<notificationId>");
      System.exit(1);
    }

    api.disconnect(); // Disconnect from the notification service
    System.out.println("Disconnected from notification service");
    System.exit(0);
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