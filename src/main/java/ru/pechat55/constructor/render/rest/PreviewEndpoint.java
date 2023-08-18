package ru.pechat55.constructor.render.rest;

import com.sun.net.httpserver.HttpExchange;
import org.apache.http.HttpStatus;
import ru.pechat55.constructor.render.App;
import ru.pechat55.constructor.render.Parameters;
import ru.pechat55.constructor.render.Settings;

public class PreviewEndpoint extends Endpoint {

    public static final String ERROR_PREFIX = "Ошибка вызова App.render():";

    public PreviewEndpoint(App app) {
        super(app);
    }

    @Override
    public HttpResponse processRequest(HttpExchange exchange) throws Exception {
        Parameters parameters = getParameters(exchange);
        parameters.setFrames(1);
        String image = "";
        try {
            image = app.render(parameters);
        } catch (Exception e) {
            e.printStackTrace();
            StringBuilder error = new StringBuilder(ERROR_PREFIX + "\n");
            for (StackTraceElement stackTraceElement : e.getStackTrace()) {
                error
                        .append(stackTraceElement.toString())
                        .append("\n");
            }
            image = error.toString();
        }

        if (image.isEmpty()) {
            return new HttpResponse(
                    HttpStatus.SC_REQUEST_TIMEOUT,
                    "Не удалось выполнить запрос за " + Settings.REQUEST_TIMEOUT_SECONDS + " секунд"
            );
        }

        if (image.startsWith(ERROR_PREFIX)) {
            return new HttpResponse(HttpStatus.SC_INTERNAL_SERVER_ERROR, image);
        }

        return new HttpResponse(HttpStatus.SC_OK, image);
    }

}
