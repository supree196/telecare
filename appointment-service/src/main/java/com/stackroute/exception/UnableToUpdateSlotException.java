package com.stackroute.exception;

public class UnableToUpdateSlotException extends RuntimeException{
    public UnableToUpdateSlotException() {
    }

    public UnableToUpdateSlotException(String message) {
        super(message);
    }

    @Override
    public String toString() {
        return "Unable To Update Exception";
    }
}
