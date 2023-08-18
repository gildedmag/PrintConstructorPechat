package ru.pechat55.constructor.render.rest;

import com.sun.net.httpserver.HttpExchange;
import org.apache.http.HttpStatus;
import ru.pechat55.constructor.render.App;

import java.nio.file.Files;
import java.nio.file.Paths;

public class LogEndpoint extends Endpoint {

    public LogEndpoint(App app) {
        super(app);
    }

    @Override
    public HttpResponse processRequest(HttpExchange exchange) throws Exception {
        StringBuilder body = new StringBuilder("=================STANDARD OUTPUT:\n\n");
        for (String line : Files.readAllLines(Paths.get(App.LOG_OUT_PATH))) {
            body
                    .append(line)
                    .append("\n");
        }
        body.append("\n\n\n=================ERROR OUTPUT:\n\n");
        for (String line : Files.readAllLines(Paths.get(App.LOG_ERR_PATH))) {
            body
                    .append(line)
                    .append("\n");
        }

        return new HttpResponse(
                HttpStatus.SC_OK,
                body.toString()
        );

    }

}
