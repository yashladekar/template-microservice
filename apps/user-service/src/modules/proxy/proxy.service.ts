import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "../../config/env";

export const userProxy = createProxyMiddleware({
    target: env.USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/users": "" },
});

export const productProxy = createProxyMiddleware({
    target: env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/products": "" },
});
