import org.junit.Test;

public class CupTest {

    @Test
    public void test() throws Exception {
        String html = Utils.readResource("animation_multiple.html");
        String src = Utils.readResource("cup.txt");
        String script = "document.body.appendChild(new Icon('$').getElement());";
        String scripts = "";
        for (int i = 0; i < 100; i++) {
            scripts += script.replaceFirst(Constructor.$, src);
        }
        html = html.replaceFirst(Constructor.$, scripts);

        Utils.write(html, "./render/icon.html");
    }

}
