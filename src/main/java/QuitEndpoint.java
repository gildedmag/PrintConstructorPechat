import com.sun.net.httpserver.HttpExchange;

public class QuitEndpoint extends Endpoint {

    QuitEndpoint(App app) {
        super(app);
    }

    @Override
    public Response processRequest(HttpExchange exchange) {
        app.exit();
        return new Response(200, "");
    }

}
