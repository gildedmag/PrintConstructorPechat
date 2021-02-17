import org.apache.commons.codec.binary.Base64;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.logging.LogEntries;
import org.openqa.selenium.logging.LogEntry;
import org.openqa.selenium.logging.LogType;
import org.openqa.selenium.remote.Augmenter;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static org.apache.http.util.TextUtils.isEmpty;

public class Constructor {

    public ChromeDriver driver;
    public volatile String modelName;
    public volatile String version;
    public volatile int width;
    public volatile int height;
    public volatile int polarAngle = 45;
    public volatile long runs = 0;
    public volatile long errors = 0;
    public volatile long maxTime = 0;
    public volatile long lastTime = 0;
    public volatile boolean isBusy = false;

    static final String RENDERER_PATH = "file://" + Settings.CONSTRUCTOR_DIR + "/renderer.html";
    static final String $ = "\\$";

    private final String setStateScript = Utils.readResource("set_state.js");
    private final String loadModelScript = Utils.readResource("load_model.js");
    private final String resizeScript = Utils.readResource("resize.js");

    public Constructor(ChromeDriver driver) {
        this.driver = driver;
        this.driver.get(RENDERER_PATH);
        driver.manage().timeouts().setScriptTimeout(5, TimeUnit.SECONDS);
        driver.executeScript("Constructor.settings.localStorage.enabled=false;");
        updateVersion();
    }

    public String captureScreen() {
        try {
            WebDriver augmentedDriver = new Augmenter().augment(driver);
            File file = ((TakesScreenshot)augmentedDriver).getScreenshotAs(OutputType.FILE);
            return file.getAbsolutePath();
        }
        catch(Exception e) {
            return e.getMessage();
        }
    }

    public String getLogs(){
        StringBuilder logs = new StringBuilder();
        for (String logType : this.driver.manage().logs().getAvailableLogTypes()) {
            logs
                    .append("<br><b>")
                    .append(logType)
                    .append("</b><br><br>");
            for (LogEntry entry : this.driver.manage().logs().get(logType).getAll()) {
                logs.append(entry)
                        .append("<br>");
            }
        }
        logs.append("<br><br>");
        return logs.toString();
    }

    public void setSize(int width, int height) {
        if (width != this.width || height != this.height) {
            this.width = width;
            this.height = height;
            driver.manage().window().setSize(new Dimension(width, height));
            String script = resizeScript
                    .replaceFirst($, String.valueOf(width))
                    .replaceFirst($, String.valueOf(height));
            driver.executeScript(script);
        } else {
            driver.executeScript("c.preview.updateSideMaterials();");
        }
    }

    public void setMode3D() {
        driver.executeScript("c.setMode(Mode.Mode3D)");
    }

    public void addSide(int width, int height) {
        driver.executeScript("c.addSide(" + width + ", " + height + ")");
    }

    public Element2D addRectangle() {
        Element2D element = new Element2D(this);
        driver.executeScript(element.id + " = c.addElement(ElementType.RECTANGLE)");
        return element;
    }

    public void updateVersion() {
        version = (String) driver.executeScript("return Constructor.version");
    }

    public void setState(final String json, final String modelName) {
        String state = json;
//        for (String domain : Settings.DOMAINS) {
//            if (!isEmpty(domain)) {
//                state = json.replaceAll(domain, "file://" + Settings.WEB_DIR);
//            }
//        }

        String script = setStateScript.replaceFirst($, state);
        driver.executeAsyncScript(script);
        this.modelName = modelName;
    }

    public String getState() {
        return (String) driver.executeScript("return c.getState(true)");
    }

    public String getHtml() {
        return (String) driver.executeScript("return document.documentElement.innerHTML");
    }

    public boolean loadModel(String modelName) {
        try {
            driver.executeAsyncScript(loadModelScript.replaceFirst($, modelName));
            this.modelName = modelName;
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public void setBackground(String value) {
        driver.executeScript("c.preview.renderer.setClearColor('" + value + "');");
        driver.executeScript("document.body.style.background='" + value + "';");
    }

    public void setAzimuthAngle(int value) {
        String angle = String.valueOf(Math.toRadians(value));
        driver.executeScript("c.preview.controls.maxAzimuthAngle = " + angle);
        driver.executeScript("c.preview.controls.minAzimuthAngle = " + angle);
        driver.executeScript("c.preview.controls.update()");
    }

    public void setPolarAngle(int value) {
        if (polarAngle != value) {
            String angle = String.valueOf(Math.toRadians(value));
            driver.executeScript("c.preview.controls.maxPolarAngle = " + angle);
            driver.executeScript("c.preview.controls.minPolarAngle = " + angle);
            this.polarAngle = value;
        }
    }

    public void printLog() {
        LogEntries logEntries = driver.manage().logs().get(LogType.BROWSER);
        for (LogEntry entry : logEntries) {
            System.out.println(new Date(entry.getTimestamp()) + " " + entry.getLevel() + " " + entry.getMessage());
        }
    }

    public String toDataUrl() {
        return (String) driver.executeScript("return c.preview.renderer.domElement.toDataURL('image/jpeg', 0." + Settings.QUALITY + ");");
    }

    @Override
    public String toString() {
        return width + "x" + height + " " + modelName + " " + runs;
    }
}
