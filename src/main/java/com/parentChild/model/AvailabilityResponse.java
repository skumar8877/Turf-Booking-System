package com.parentChild.model;

import java.util.Set;

public class AvailabilityResponse {

    private Set<String> booked;
    private Set<String> blocked;
    private Set<String> available;

        public AvailabilityResponse(Set<String> booked,
                                    Set<String> blocked,
                                    Set<String> available) {

            this.booked = booked;
            this.blocked = blocked;
            this.available = available;
        }

        public Set<String> getBooked() {
            return booked;
        }

        public Set<String> getBlocked() {
            return blocked;
        }

        public Set<String> getAvailable() {
            return available;
        }
}
