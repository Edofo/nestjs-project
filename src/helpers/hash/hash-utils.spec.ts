import { jest } from "@jest/globals";
import * as bcrypt from "bcrypt";

import { hash, verifyHash } from "./hash-utils";

jest.mock("bcrypt", () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

describe("hash function", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should hash a given string", async () => {
        const testString = "testString";
        const expectedHash = "hashedString";

        (bcrypt.hash as jest.Mock).mockResolvedValue(expectedHash as never);

        const result = await hash(testString);

        expect(bcrypt.hash).toHaveBeenCalledWith(testString, 10);
        expect(result).toBe(expectedHash);
    });

    it("should throw an error if the hashing fails", async () => {
        const testString = "testString";
        const error = new Error("Hashing failed");

        (bcrypt.hash as jest.Mock).mockRejectedValue(error as never);

        await expect(hash(testString)).rejects.toThrow(error);
    });

    it("should throw an error if the input string is empty", async () => {
        const testString = "";
        const error = new Error("Data must not be empty");

        (bcrypt.hash as jest.Mock).mockImplementation(() => {
            throw error;
        });

        await expect(hash(testString)).rejects.toThrow(error);
    });

    it("should call bcrypt hash with the correct number of salt rounds", async () => {
        const testString = "testString";
        const expectedHash = "hashedString";
        const saltOrRounds = 10;

        (bcrypt.hash as jest.Mock).mockResolvedValue(expectedHash as never);

        await hash(testString);

        expect(bcrypt.hash).toHaveBeenCalledWith(testString, saltOrRounds);
    });
});

describe("verifyHash function", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return true when bcrypt.compare succeeds with a match", async () => {
        const word = "password";
        const hashWord = "$2b$12$abcdefabcdefabcdefabcdef";

        (bcrypt.compare as jest.Mock).mockResolvedValue(true as never);

        await expect(verifyHash(word, hashWord)).resolves.toBe(true);

        expect(bcrypt.compare).toHaveBeenCalledWith(word, hashWord);
    });

    it("should return false when bcrypt.compare succeeds without a match", async () => {
        const word = "password";
        const hashWord = "$2b$12$abcdefabcdefabcdefabcdef";

        (bcrypt.compare as jest.Mock).mockResolvedValue(false as never);

        await expect(verifyHash(word, hashWord)).resolves.toBe(false);

        expect(bcrypt.compare).toHaveBeenCalledWith(word, hashWord);
    });

    it("should throw an error when bcrypt.compare fails", async () => {
        const word = "password";
        const hashWord = "$2b$12$abcdefabcdefabcdefabcdef";
        const error = new Error("Compare failed");

        (bcrypt.compare as jest.Mock).mockRejectedValue(error as never);

        await expect(verifyHash(word, hashWord)).rejects.toThrow(error);

        expect(bcrypt.compare).toHaveBeenCalledWith(word, hashWord);
    });

    it("should handle empty strings", async () => {
        const word = "";
        const hashWord = "";

        (bcrypt.compare as jest.Mock).mockResolvedValue(false as never);

        await expect(verifyHash(word, hashWord)).resolves.toBe(false);

        expect(bcrypt.compare).toHaveBeenCalledWith(word, hashWord);
    });
});
