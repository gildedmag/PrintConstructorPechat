import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;

import static java.net.HttpURLConnection.HTTP_INTERNAL_ERROR;
import static java.nio.charset.StandardCharsets.UTF_8;

public abstract class Endpoint implements HttpHandler {

    App app;

    Endpoint(App app) {
        this.app = app;
    }

    @Override
    public void handle(final HttpExchange exchange) {
        new Thread(() -> {
            Response response;
            try {
                response = processRequest(exchange);
            } catch (Exception e) {
                e.printStackTrace();
                StringBuilder stackTrace = new StringBuilder();
                stackTrace.append(e.getMessage());
                for (StackTraceElement stackTraceElement : e.getStackTrace()) {
                    stackTrace.append(stackTraceElement).append(System.lineSeparator());
                }
                response = new Response(HTTP_INTERNAL_ERROR, stackTrace.toString());
            }
            sendResponse(exchange, response);
        }).start();
    }

    abstract public Response processRequest(HttpExchange exchange) throws Exception;

    static void sendResponse(final HttpExchange exchange, final Response response) {
        byte[] bytes = null;
        try {
            bytes = response.body.getBytes(UTF_8);
            exchange.sendResponseHeaders(response.status, bytes.length);
        } catch (IOException e) {
            e.printStackTrace();
        }
        try (OutputStream os = exchange.getResponseBody()) {
            if (bytes != null) {
                os.write(bytes);
            }
            os.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    Parameters getParameters(HttpExchange exchange) throws Exception {
        return new Parameters(exchange);
    }

}
