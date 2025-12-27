import { asyncHandler } from "../../utils/async-handler";
import { healthService } from "./health.service";

export const healthCheck = asyncHandler(async (_req, res) => {
    res.json(healthService());
});
