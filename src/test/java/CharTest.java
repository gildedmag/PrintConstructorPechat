import org.junit.Test;

public class CharTest {



    @Test
    public void test() {
        String json = Utils.readResource("multiline_text.json");
        json = json.replaceAll("\\\\n", "\n");
        System.out.println(json);
    }

}
