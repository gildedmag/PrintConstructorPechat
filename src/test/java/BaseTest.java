import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.junit.After;
import org.junit.Before;
import ru.pechat55.constructor.render.*;

import java.awt.*;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;

public abstract class BaseTest {

    protected App app;

    static String loadModelJson = Utils.readResource("loadModel.json");

    int getPoolSize() {
        return 1;
    }

    String[] getPreloadedModels() {
        return new String[0];
    }

    @Before
    public void setUp() throws Exception {
        Settings.POOL_SIZE = getPoolSize();
        Settings.CONSTRUCTOR_DIR = new File("examples").getCanonicalPath();
        Settings.DRIVER_PATH = new File("chromedriver/mac/chromedriver").getCanonicalPath();
        if (getPreloadedModels().length != 0) {
            Settings.PRELOADED_MODELS = getPreloadedModels();
        }
        app = new App();
    }

    String render(String model) throws Exception {
        String json = loadModelJson.replaceFirst(Constructor.$, model);
        Parameters parameters = new Parameters(json, 32, 32);
        return app.render(parameters);
    }

    public void post(String completeUrl, String body) {
        HttpClient httpClient = new DefaultHttpClient();
        HttpPost httpPost = new HttpPost(completeUrl);
        httpPost.setHeader("Content-type", "application/json");
        try {
            StringEntity stringEntity = new StringEntity(body);
            httpPost.getRequestLine();
            httpPost.setEntity(stringEntity);

            httpClient.execute(httpPost);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    void openImageInBrowser(String src) throws Exception {
        String html = Utils.readResource("preview.html");
        html = html.replaceFirst(Constructor.$, src);
        Path path = Utils.write(html, "./temp/preview.html");
        Desktop.getDesktop().browse(path.toUri());
        Files.delete(path);
    }

    @After
    public void tearDown() throws Exception {
        app.server.stop(0);
    }
}

