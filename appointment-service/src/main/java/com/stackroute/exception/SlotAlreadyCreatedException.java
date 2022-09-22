package com.stackroute.exception;

public class SlotAlreadyCreatedException extends RuntimeException{
    public SlotAlreadyCreatedException() {
    }

    public SlotAlreadyCreatedException(String message) {
        super(message);
    }

    @Override
    public String toString() {
        return "Slot already created...please check";
    }
}
