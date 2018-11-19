import com.sun.net.httpserver.HttpExchange;

public class PreviewEndpoint extends Endpoint {

    PreviewEndpoint(App app) {
        super(app);
    }

    @Override
    public Response processRequest(HttpExchange exchange) throws Exception {
        Parameters parameters = getParameters(exchange);
        parameters.setFrames(1);
        String image = app.render(parameters);
        return new Response(200, image);
    }

}
