import org.junit.Test;

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
