import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.logging.LogType;
import org.openqa.selenium.logging.LoggingPreferences;
import org.openqa.selenium.remote.CapabilityType;

import java.util.logging.Level;

public class ConstructorPool {

    volatile Constructor[] constructors = new Constructor[Settings.POOL_SIZE];
    static ChromeOptions options;

    public ConstructorPool() {
        System.setProperty("webdriver.chrome.driver", Settings.DRIVER_PATH);
        options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--disable-web-security");
        options.addArguments("--allow-file-access-from-files");
        options.addArguments("--allow-file-access");
        options.addArguments("--no-sandbox");
        options.addArguments("--silent");
        //options.addArguments("--log-level=3");
        LoggingPreferences loggingPreferences = new LoggingPreferences();
        loggingPreferences.enable(LogType.BROWSER, Level.ALL);
        options.setCapability(CapabilityType.LOGGING_PREFS, loggingPreferences);
    }

    public void init() {
        for (int i = 0, j = 0; i < Settings.POOL_SIZE; i++, j++) {
            if (j >= Settings.PRELOADED_MODELS.length) j = 0;
            final String modelName = Settings.PRELOADED_MODELS.length == 0 ? null : Settings.PRELOADED_MODELS[j];
            final int index = i;
            new Thread(() -> {
                constructors[index] = create(modelName);
            }).start();
        }
        while (size() < Settings.POOL_SIZE) sleep(100);
    }

    public Constructor create(String modelName){
        ChromeDriver driver = new ChromeDriver(options);
        driver.setLogLevel(Level.SEVERE);
        Constructor constructor = new Constructor(driver);
        if (modelName != null) constructor.loadModel(modelName);
        constructor.setSize(Settings.DEFAULT_WIDTH, Settings.DEFAULT_HEIGHT);
        constructor.setBackground(Settings.BACKGROUND);
        constructor.setMode3D();
        constructor.isBusy = false;
        return constructor;
    }

    public synchronized Constructor get() {
        return get(null);
    }

    public synchronized Constructor get(String modelName) {
        Constructor sameModelCandidate = null;
        Constructor nullModelCandidate = null;
        Constructor otherModelCandidate = null;
        Constructor winner;

        for (Constructor candidate : constructors) {
            if (candidate != null && !candidate.isBusy) {
                if (candidate.modelName == null) {
                    if (nullModelCandidate == null || nullModelCandidate.runs > candidate.runs) {
                        nullModelCandidate = candidate;
                    }
                } else if (candidate.modelName.equals(modelName)) {
                    if (sameModelCandidate == null || sameModelCandidate.runs > candidate.runs) {
                        sameModelCandidate = candidate;
                    }
                } else {
                    if (otherModelCandidate == null || otherModelCandidate.runs > candidate.runs) {
                        otherModelCandidate = candidate;
                    }
                }
            }
        }

        if (sameModelCandidate != null) {
            winner = sameModelCandidate;
        } else if (nullModelCandidate != null) {
            winner = nullModelCandidate;
        } else {
            winner = otherModelCandidate;
        }

        if (winner != null) {
            winner.isBusy = true;
            return winner;
        }
        sleep(100);
        return get(modelName);
    }

    private synchronized int size() {
        int size = 0;
        for (Constructor constructor : constructors) {
            if (constructor != null) size++;
        }
        return size;
    }

    void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
