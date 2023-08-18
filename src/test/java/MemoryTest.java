import org.junit.Test;
import ru.pechat55.constructor.render.App;
import ru.pechat55.constructor.render.Settings;

import java.io.File;

public class MemoryTest {

    @Test
    public void test() throws Exception {
        Settings.POOL_SIZE = 16;
        Settings.CONSTRUCTOR_DIR = new File("examples").getCanonicalPath();
        Settings.DRIVER_PATH = new File("temp/chromedriver/mac/chromedriver").getCanonicalPath();
        Settings.PRELOADED_MODELS = new String[]{ "jar", "ball" };
        App app = new App();
        Thread.sleep(10_000);
        app.exit();
    }
}
