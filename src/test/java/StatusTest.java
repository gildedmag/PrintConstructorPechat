import org.junit.Test;

import java.awt.*;
import java.nio.file.Files;
import java.nio.file.Path;

public class StatusTest extends BaseTest {

    @Test
    public void test() throws Exception {
        String html = ((StatusEndpoint) app.statusEndpoint).getStatus();
        Path path = Utils.write(html, "./temp/status.html");
        Desktop.getDesktop().browse(path.toUri());
        Files.delete(path);
    }

    @Test
    public void test2() throws Exception {
        for (int i = 0; i < 10; i++) {
            Utils.trace("status");
            ((StatusEndpoint) app.statusEndpoint).getStatus();
            Utils.trace("status");
        }
    }

}
