package ru.pechat55.constructor.render.rest;

import com.sun.net.httpserver.HttpExchange;
import ru.pechat55.constructor.render.*;

public class ReloadEndpoint extends Endpoint {

    public ReloadEndpoint(App app) {
        super(app);
    }

    @Override
    public HttpResponse processRequest(HttpExchange exchange) {
        try {
            Parameters parameters = getParameters(exchange);
            int index = Integer.parseInt(parameters.get("index").toString());
            app.constructorPool.reinit(index);
            return new HttpResponse(200, "Constructor " + index + " was reinitialized");
        } catch (Exception e) {
            e.printStackTrace();
            return new HttpResponse(500, e.getMessage());
        }
    }

    private String toSeconds(long millis) {
        double seconds = Math.round(millis / 100);
        return seconds / 10 + " s";
    }

    private String getUptime() {
        long seconds = (System.currentTimeMillis() - app.started) / 1000;
        long minutes = seconds / 60;
        long hours = minutes / 60;
        long days = hours / 24;
        StringBuilder uptime = new StringBuilder();
        if (days > 0) uptime.append(days).append(" d ");
        if (hours > 0) uptime.append(hours % 24).append(" h ");
        uptime.append(minutes % 60).append(" m");
        return uptime.toString();
    }

}
