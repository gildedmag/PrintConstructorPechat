package ru.pechat55.constructor.render.rest;

class HttpResponse {

    public final int status;
    public final String body;

    public HttpResponse(int status, String body) {
        this.status = status;
        this.body = body;
    }

}
