package ca.wbac.timesheet.resource.identifier.impl;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
class Site {
    private String Name;

    Site() {}

    Site(String name) {
        setName(name);
    }

    String getName() {
        return Name;
    }

    void setName(String name) {
        Name = name;
    }
}
