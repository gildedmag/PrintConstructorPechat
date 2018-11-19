import com.sun.net.httpserver.HttpExchange;

public class AnimationEndpoint extends Endpoint {

    AnimationEndpoint(App app) {
        super(app);
    }

    @Override
    public Response processRequest(HttpExchange exchange) throws Exception {
        Parameters parameters = getParameters(exchange);
        String image = app.render(parameters);
        return new Response(200, image);
    }

}
