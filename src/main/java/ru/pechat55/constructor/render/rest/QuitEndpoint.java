package ru.pechat55.constructor.render.rest;

import com.sun.net.httpserver.HttpExchange;
import ru.pechat55.constructor.render.App;

public class QuitEndpoint extends Endpoint {

    public QuitEndpoint(App app) {
        super(app);
    }

    @Override
    public HttpResponse processRequest(HttpExchange exchange) {
        app.exit();
        return new HttpResponse(200, "");
    }

}
