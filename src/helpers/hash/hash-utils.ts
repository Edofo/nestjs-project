import * as bcrypt from "bcrypt";

export const hash = async (word: string): Promise<string> => {
    try {
        const saltOrRounds = 10;
        return await bcrypt.hash(word, saltOrRounds);
    } catch (err) {
        throw err;
    }
};

export const verifyHash = async (word: string, hashWord: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(word, hashWord);
    } catch (err) {
        throw err;
    }
};
