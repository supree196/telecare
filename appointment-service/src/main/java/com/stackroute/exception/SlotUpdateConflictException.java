package com.stackroute.exception;

public class SlotUpdateConflictException extends RuntimeException{

    public SlotUpdateConflictException() {
    }

    public SlotUpdateConflictException(String message) {
        super(message);
    }

    @Override
    public String toString() {
        return "Slot Update Conflict Exception...";
    }
}
