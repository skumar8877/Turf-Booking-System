package com.parentChild.service;

import com.parentChild.config.ArenaOverlapConfig;
import com.parentChild.model.AvailabilityResponse;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class BookingService {

    private final Set<String> booked = new HashSet<>();

    public String bookArena(String arenaId) {

        if(booked.contains(arenaId)) {
            return "Already booked";
        }

        booked.add(arenaId);

        return "Booking successful";
    }

    public AvailabilityResponse getAvailability() {

        Set<String> blocked = new HashSet<>();

        for(String arena : booked) {

            blocked.addAll(
                    ArenaOverlapConfig.OVERLAPS.get(arena)
            );
        }

        blocked.removeAll(booked);

        Set<String> available =
                new HashSet<>(ArenaOverlapConfig.ALL_ARENAS);

        available.removeAll(booked);
        available.removeAll(blocked);

        return new AvailabilityResponse(
                booked,
                blocked,
                available
        );
    }

    public String resetBookings() {
        booked.clear();
        return "All bookings have been reset";
    
    }
}
