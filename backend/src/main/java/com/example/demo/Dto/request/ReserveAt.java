package com.example.demo.Dto.request;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;

public class ReserveAt {

    private String host_id;
    private LocalDate date_at;

    public ReserveAt(String host_id, LocalDate date_at) {
        this.host_id = host_id;
        this.date_at = date_at;
        //this.date_at = date_at.atStartOfDay().toInstant(ZoneOffset.UTC).atZone(ZoneId.of("UTC")).toLocalDate();

    }

    public String getHost_id() {
        return host_id;
    }

    public void setHost_id(String host_id) {
        this.host_id = host_id;
    }

    public LocalDate getDate_at() {
        return date_at;
    }

    public void setDate_at(LocalDate date_at) {
        this.date_at = date_at;
    }
}
