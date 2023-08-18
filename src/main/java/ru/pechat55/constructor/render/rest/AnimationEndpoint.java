package ru.pechat55.constructor.render.rest;

import com.sun.net.httpserver.HttpExchange;
import ru.pechat55.constructor.render.App;
import ru.pechat55.constructor.render.Parameters;

public class AnimationEndpoint extends Endpoint {

    public AnimationEndpoint(App app) {
        super(app);
    }

    @Override
    public HttpResponse processRequest(HttpExchange exchange) throws Exception {
        Parameters parameters = getParameters(exchange);
        String image = app.render(parameters);
        return new HttpResponse(200, image);
    }

}
