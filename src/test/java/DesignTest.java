import org.junit.Test;

public class DesignTest extends BaseTest {

    static String json = Utils.readResource("test.json");
    static String html = Utils.readResource("animation_multiple.html");
    static Parameters parameters = new Parameters(json, 200, 200, 16);

    @Override
    int getPoolSize() {
        return 1;
    }

    @Test
    public void test() throws Exception {
        String script = "document.body.appendChild(new Icon('$').getElement());";
        String scripts = "";
        for (int i = 0; i < 100; i++) {
            String src = app.render(parameters);
            scripts += script.replaceFirst(Constructor.$, src);
        }
        html = html.replaceFirst(Constructor.$, scripts);

        Utils.write(html, "./render/icon.html");
    }

    @Test
    public void testSize() throws Exception {
        String src = app.render(parameters);
        System.out.println(src.length() / 1024 + " KB");
    }

    @Test
    public void testMultilineText() throws Exception {
        String json = Utils.readResource("multiline_text.json");
        Parameters parameters = new Parameters(json, 800, 500);
        String src = app.render(parameters);
        openImageInBrowser(src);

    }
}
