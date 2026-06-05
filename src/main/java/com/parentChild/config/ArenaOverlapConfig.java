package com.parentChild.config;

import java.util.*;

public class ArenaOverlapConfig {

    public static final Set<String> ALL_ARENAS =
            Set.of("P1", "P2", "C1", "C2", "C3");

    public static final Map<String, Set<String>> OVERLAPS =
            new HashMap<>();

    static {

        OVERLAPS.put("P1",
                Set.of("C1", "C2"));

        OVERLAPS.put("P2",
                Set.of("C2", "C3"));

        OVERLAPS.put("C1",
                Set.of("P1"));

        OVERLAPS.put("C2",
                Set.of("P1", "P2"));

        OVERLAPS.put("C3",
                Set.of("P2"));
    }
}