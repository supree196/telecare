package com.stackroute.exception;

public class SlotNotExistsException extends RuntimeException{

    public SlotNotExistsException() {
    }

    public SlotNotExistsException(String message) {
        super(message);
    }

    @Override
    public String toString() {
        return "Slot does not exists...";
    }
}
