import { HttpException, HttpStatus } from "@nestjs/common";
// import * as Sentry from "@sentry/node";
import { LoggerService } from "@modules/logger/services/logger.service";

const LogError = async (error) => {
    const logger = new LoggerService();
    logger.error(error);

    if (!error?.response) {
        // Send the error to sentry
        // Sentry.captureException(error);
        // return a generic error
        return new HttpException("Please contact an Administrator", HttpStatus.BAD_REQUEST);
    }
    return error;
};

export default LogError;
