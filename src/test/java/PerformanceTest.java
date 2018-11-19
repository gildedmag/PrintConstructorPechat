import org.junit.Test;

public class PerformanceTest extends BaseTest {

    static String json = Utils.readResource("1.json");
    static String html = Utils.readResource("animation.html");

    @Test
    public void testAnimation() throws Exception {
        test(16, "./render/animation.html");
    }

    @Test
    public void testPreview() throws Exception {
        test(1, "./render/preview.html");
    }

    void test(int frames, String filename) {
        Parameters parameters = new Parameters(json, 512, 512, frames);
        Utils.trace("render " + frames + " frames");
        String src = app.render(parameters);
        Utils.trace("render " + frames + " frames");
        Utils.write(html.replaceFirst(Constructor.$, src), filename);
    }

}
