import com.sun.net.httpserver.HttpExchange;
import org.apache.commons.text.StringEscapeUtils;

public class LogsEndpoint extends Endpoint {

    LogsEndpoint(App app) {
        super(app);
    }

    @Override
    public Response processRequest(HttpExchange exchange) {
        return new Response(200, getStatus());
    }

    public String getStatus() {
        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html><html><body style=\"font-family:monospace;\">");
        for (Constructor constructor : app.constructorPool.constructors) {
            if (constructor != null) {
                html
                        .append("-------------------------------------------------------------------------------<br>")
                        .append(constructor.version)
                        .append("<br>")
                        .append(constructor.modelName)
                        .append("<br>")
                        .append(constructor.height)
                        .append("<br>")
                        .append("runs: ")
                        .append(constructor.runs)
                        .append("<br>")
                        .append("errors: ")
                        .append(constructor.errors)
                        .append("<br>")
                        .append("<br>")
                        .append("<img src=\"")
                        .append(constructor.toDataUrl())
                        .append("\">")
                        .append("<br>")
                        .append("<pre>")
                        .append(StringEscapeUtils.escapeHtml4(constructor.getHtml()))
                        .append("</pre>")
                        .append("<br>")
                        .append(constructor.getLogs())
                        .append("<br>");
            } else {
                html.append("initializing...<br>");
            }
        }
        html.append("</body></html>");

        return html.toString();
    }

    private String toSeconds(long millis) {
        double seconds = Math.round(millis / 100);
        seconds /= 10;
        return seconds + " s";
    }

}
