package com.parentChild.controller;

import com.parentChild.model.AvailabilityResponse;
import com.parentChild.model.Booking;
import com.parentChild.service.BookingService;
import org.springframework.web.bind.annotation.*;

//@RestController
//@RequestMapping("/api")
//@CrossOrigin("*")

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(
            BookingService bookingService) {

        this.bookingService = bookingService;
    }

    @PostMapping("/book")
    public String bookArena(
            @RequestBody Booking request) {

        return bookingService
                .bookArena(request.getArenaId());
    }

    @GetMapping("/availability")
    public AvailabilityResponse getAvailability() {

        return bookingService.getAvailability();
    }

    @PostMapping("/reset")
    public String resetBookings() {

        return bookingService.resetBookings();
    }
}