public class ConstructorTest extends BaseTest {

    Constructor constructor;

    @Override
    public void setUp() throws Exception {
        super.setUp();
        constructor = app.constructorPool.get();
    }
}
