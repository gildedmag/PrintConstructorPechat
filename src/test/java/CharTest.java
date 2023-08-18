import org.junit.Test;
import ru.pechat55.constructor.render.Utils;

public class CharTest {



    @Test
    public void test() {
        String json = Utils.readResource("multiline_text.json");
        json = json.replaceAll("\\\\n", "\n");
        System.out.println(json);
    }

}
