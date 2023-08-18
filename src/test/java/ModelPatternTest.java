import org.junit.Test;
import ru.pechat55.constructor.render.Utils;

public class ModelPatternTest {

    @Test
    public void test() throws Exception {
        String name = Utils.parseModelName("{\n" +
                "  \"model\": \"t-shirt\",\n" +
                "  \"fills\": [\n" +
                "    16777215\n" +
                "  ],\n" +
                "  \"sides\": [");

        System.out.println("'" + name + "'");
    }


}
