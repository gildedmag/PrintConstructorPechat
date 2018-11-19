import org.junit.Assert;
import org.junit.Test;

public class ConstructorPoolTest extends BaseTest {

    private static final String JAR = "t-shirt";
    private static final String BALL = "ball";
    private static final String CAP = "cap";
    private static final String CD = "cd";

    @Override
    int getPoolSize() {
        return 4;
    }

    @Test
    public void name() throws Exception {
        assertConstructorModels(null, null, null, null);
        render(JAR);
        assertConstructorModels(JAR, null, null, null);
        render(JAR);
        assertConstructorModels(JAR, null, null, null);
        render(BALL);
        assertConstructorModels(JAR, BALL, null, null);
        render(BALL);
        assertConstructorModels(JAR, BALL, null, null);
        render(CAP);
        assertConstructorModels(JAR, BALL, CAP, null);
        render(CAP);
        assertConstructorModels(JAR, BALL, CAP, null);
        render(CD);
        assertConstructorModels(JAR, BALL, CAP, CD);
        render(CD);
        assertConstructorModels(JAR, BALL, CAP, CD);

    }

    void assertConstructorModels(String... models) {
        Assert.assertEquals(models.length, app.constructorPool.constructors.length);
        for (int i = 0; i < models.length; i++) {
            Assert.assertEquals(models[i], app.constructorPool.constructors[i].modelName);
        }
    }

}
