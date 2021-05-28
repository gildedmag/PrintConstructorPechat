import com.sun.net.httpserver.HttpServer;
import org.openqa.selenium.chrome.ChromeDriver;

import java.io.File;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.logging.Level;

import static org.apache.commons.lang3.StringUtils.isEmpty;

public class App {

    public static final String jarPath = new File(App.class.getProtectionDomain().getCodeSource().getLocation().getPath()).getParentFile().getAbsolutePath();

    public final long started;

    ConstructorPool constructorPool;
    Executor executor = Executors.newFixedThreadPool(Settings.POOL_SIZE * 2);

    HttpServer server;
    Endpoint statusEndpoint;
    Endpoint previewEndpoint;
    Endpoint animationEndpoint;
    Endpoint quitEndpoint;
    Endpoint logsEndpoint;

    public App() {
        started = System.currentTimeMillis();
        constructorPool = new ConstructorPool();
        statusEndpoint = new StatusEndpoint(this);
        previewEndpoint = new PreviewEndpoint(this);
        animationEndpoint = new AnimationEndpoint(this);
        quitEndpoint = new QuitEndpoint(this);
        logsEndpoint = new LogsEndpoint(this);
        executor.execute(this::listen);
        Utils.trace("init");
        if (isEmpty(Settings.CONSTRUCTOR_DIR)){
            throw new RuntimeException("CONSTRUCTOR_DIR is empty!");
        }
        Utils.copyResource("renderer.html", Settings.CONSTRUCTOR_DIR + "/renderer.html", true);
        System.out.println(Utils.getJatPath() + "/renderer.html");
        //Utils.copyResource("renderer.html",  "/" + Utils.getJatPath() + "/renderer.html");
        killChromeProcesses();
        constructorPool.init();
        Utils.trace("init");
        schedulePoolRefresh(Settings.CLEAN_INTERVAL_HOURS);
        //Runtime.getRuntime().addShutdownHook(new Thread(this::exit));
    }

    private void schedulePoolRefresh(int intervalHours){
        try {
            Thread.sleep((long) intervalHours * 60 * 60 * 1000);
            constructorPool.clean();
            killChromeProcesses();
            constructorPool.init();
        } catch (Exception e) {
            e.printStackTrace();
        }
        schedulePoolRefresh(intervalHours);
    }

    public void exit() {
        killChromeProcesses();
        server.stop(0);
        System.exit(0);
    }

    private void killChromeProcesses(){
        ProcessBuilder process = new ProcessBuilder("pkill", "-f", "chrome");
        try {
            process.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String render(Parameters parameters) {
        Constructor constructor = constructorPool.get(parameters.getModelName());
        StringBuilder frames;
        long s = System.currentTimeMillis();
        try {
            constructor.setState(parameters.getJson(), parameters.getModelName());
            constructor.setSize(parameters.getWidth(), parameters.getHeight());
            constructor.setPolarAngle(45);
            frames = new StringBuilder();
            for (int angle = 0, i = 0; angle < 360; angle += 360 / parameters.getFrames(), i++) {
                constructor.setAzimuthAngle(angle);
                String frame = constructor.toDataUrl();
                frames.append(frame);
                if (parameters.getFrames() > 1 && i < parameters.getFrames()) {
                    frames.append("_");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            constructor.errors++;
            throw e;
        } finally {
            constructor.runs++;
            constructor.isBusy = false;
        }
        long time = System.currentTimeMillis() - s;
        if (time > constructor.maxTime) constructor.maxTime = time;
        constructor.lastTime = time;
        return frames.toString();
    }

    public void listen() {
        try {
            server = HttpServer.create(new InetSocketAddress(Settings.PORT), 0);
            server.createContext("/", statusEndpoint);
            server.createContext("/status", statusEndpoint);
            server.createContext("/version", statusEndpoint);
            server.createContext("/preview", previewEndpoint);
            server.createContext("/icon", animationEndpoint);
            server.createContext("/animation", animationEndpoint);
            server.createContext("/quit", quitEndpoint);
            server.createContext("/exit", quitEndpoint);
            server.createContext("/logs", logsEndpoint);
            server.setExecutor(executor);
            server.start();
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(0);
        }
    }

    public static boolean isServerRunning() {
        return !Utils.isPortAvailable(Settings.PORT);
    }

    public static void main(String[] args) {
        if (args.length == 0) {
            if (!isServerRunning()) {
                System.out.println("Starting rendering server");
                new App();
            } else {
                System.out.println("Server is already running");
                System.exit(0);
            }
        }
        if (args.length == 1) {
            if (args[0].startsWith("-v")) {
                System.out.println(Version.getVersion());
                System.exit(0);
            }
        }
    }

    void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
