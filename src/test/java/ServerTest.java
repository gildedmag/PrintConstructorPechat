import org.junit.Test;

public class ServerTest extends BaseTest {

    @Override
    int getPoolSize() {
        return 1;
    }

    @Test
    public void test() throws Exception {
        while (true) {}
    }

}
