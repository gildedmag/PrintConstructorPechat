import com.sun.net.httpserver.HttpExchange;

public class StatusEndpoint extends Endpoint {

    StatusEndpoint(App app) {
        super(app);
    }

    Runtime runtime = Runtime.getRuntime();

    private static final String html = Utils.readResource("status.html");

    @Override
    public Response processRequest(HttpExchange exchange) {
        return new Response(200, getStatus());
    }

    public String getStatus() {
        StringBuilder rows = new StringBuilder();
        for (Constructor constructor : app.constructorPool.constructors) {
            if (constructor != null) {
                rows.append(constructor.isBusy ? "<tr class=\"busy\">" : "<tr>")
                        .append("<td>").append(constructor.version).append("</td>")
                        .append("<td>").append(constructor.modelName).append("</td>")
                        .append("<td>").append(constructor.width).append("</td>")
                        .append("<td>").append(constructor.height).append("</td>")
                        .append("<td>").append(constructor.isBusy).append("</td>")
                        .append("<td>").append(toSeconds(constructor.maxTime)).append("</td>")
                        .append("<td>").append(toSeconds(constructor.lastTime)).append("</td>")
                        .append("<td>").append(constructor.runs).append("</td>")
                        .append("<td class=\"error\">")
                        .append(constructor.errors > 0 ? constructor.errors : "")
                        .append("</td>")
                        .append("</tr>");
            } else {
                rows.append("<tr><td colspan=9>initializing...</td></tr>");
            }
        }
        return html
                .replaceFirst(Constructor.$, Version.getVersion())
                .replaceFirst(Constructor.$, getUptime())
                .replaceFirst(Constructor.$, Utils.totalMemory())
                .replaceFirst(Constructor.$, Utils.freeMemory())
                .replaceFirst(Constructor.$, Utils.usedMemory())
                .replaceFirst(Constructor.$, Utils.maxMemory())
                .replaceFirst(Constructor.$, rows.toString());
    }

    private String toSeconds(long millis) {
        double seconds = Math.round(millis / 100);
        seconds /= 10;
        return seconds + " s";
    }

    private String getUptime() {
        long seconds = (System.currentTimeMillis() - app.started) / 1000;
        long minutes = seconds / 60;
        long hours = minutes / 60;
        long days = hours / 24;
        StringBuilder uptime = new StringBuilder();
        if (days > 0) uptime.append(days).append(" d ");
        if (hours > 0) uptime.append(hours % 24).append(" h ");
        uptime.append(minutes % 60).append(" m ");
        uptime.append(seconds % 60).append(" s");
        return uptime.toString();
    }

}
