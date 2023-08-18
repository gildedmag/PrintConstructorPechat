import org.junit.Test;
import ru.pechat55.constructor.render.Constructor;
import ru.pechat55.constructor.render.Utils;

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
