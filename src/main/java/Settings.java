import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import static org.apache.http.util.TextUtils.isEmpty;

public class Settings {

    public static final String PATH = "/render.properties";
    public static final String SEPARATOR = ";";
    public static String CONSTRUCTOR_DIR;
    public static String DRIVER_PATH;
    public static String WEB_DIR;
    public static String BACKGROUND;
    public static int DEFAULT_FRAMES;
    public static int CLEAN_INTERVAL_HOURS;
    public static int PORT;
    public static int POOL_SIZE;
    public static int DEFAULT_WIDTH;
    public static int DEFAULT_HEIGHT;
    public static int IDLE_TIME_MS;
    public static int QUALITY;
    public static String[] DOMAINS;
    public static String[] PRELOADED_MODELS;

    private static Properties properties;

    static {
        properties = new Properties();

        try (FileInputStream is = new FileInputStream(App.jarPath + PATH)) {
            properties.load(is);
        } catch (IOException e) {
            System.err.println("File " + App.jarPath + PATH + " not found");
        }
        CONSTRUCTOR_DIR = properties.getProperty("constructor_dir", "");
        WEB_DIR = properties.getProperty("web_dir", "");
        DRIVER_PATH = properties.getProperty("driver_path", App.jarPath + "/chromedriver");
        BACKGROUND = properties.getProperty("background", "#eeeeee");
        CLEAN_INTERVAL_HOURS = parseInt(properties.getProperty("background", ""), 24);
        PORT = parseInt("port", 2018);
        POOL_SIZE = parseInt("pool_size", 8);
        DOMAINS = parseArray("domains");
        PRELOADED_MODELS = parseArray("preloaded_models");
        DEFAULT_FRAMES = parseInt("animation_steps", 16);
        if (DEFAULT_FRAMES > 64) DEFAULT_FRAMES = 64;
        DEFAULT_WIDTH = parseInt("default_width", 228);
        DEFAULT_HEIGHT = parseInt("default_height", 228);
        IDLE_TIME_MS = parseInt("idle_time_ms", 100);
        QUALITY = parseInt("quality", 80);
        if (QUALITY < 1 || QUALITY > 99) QUALITY = 80;
    }

    private static int parseInt(String property, int defaultValue) {
        String value = properties.getProperty(property);
        if (isEmpty(value)) return defaultValue;
        return Integer.parseInt(value);
    }

    private static String[] parseArray(String property) {
        String value = properties.getProperty(property);
        if (isEmpty(value)) return new String[0];
        return value.split(SEPARATOR);
    }

}