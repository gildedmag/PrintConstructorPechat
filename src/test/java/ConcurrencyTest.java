import org.junit.Test;

public class ConcurrencyTest extends BaseTest {

    private static final String JAR = "t-shirt";
    private static final String BALL = "ball";
    private static final String CAP = "cap";
    private static final String CD = "cd";

    static String json = Utils.readResource("1.json").replaceAll(System.lineSeparator(), "");
    static String html = Utils.readResource("animation.html");
    static App app;
    static Parameters parameters = new Parameters(json, 512, 512);

    @Override
    int getPoolSize() {
        return 8;
    }

    @Override
    String[] getPreloadedModels() {
        return new String[]{ JAR, BALL, CAP, CD };
    }

    @Test
    public void test() throws Exception {
        for (int i = 0; i < 8; i++) {

        }
    }

}
