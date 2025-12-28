import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "../../config/env";

function withAuthHeaders() {
    return {
        onProxyReq(proxyReq: any, req: any) {
            if (req.auth) {
                proxyReq.setHeader("x-user-id", req.auth.userId);
                proxyReq.setHeader("x-user-email", req.auth.email);
                proxyReq.setHeader("x-user-role", req.auth.role);
                proxyReq.setHeader("x-internal-token", env.INTERNAL_TOKEN);
            }

            if (req.headers["x-request-id"]) {
                proxyReq.setHeader("x-request-id", req.headers["x-request-id"]);
            }
        },
    };
}

export const userProxy = createProxyMiddleware({
    target: env.USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/users": "" },
    ...withAuthHeaders(),
});
