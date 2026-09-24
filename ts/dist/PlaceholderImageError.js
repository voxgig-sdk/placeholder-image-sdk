"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceholderImageError = void 0;
class PlaceholderImageError extends Error {
    isPlaceholderImageError = true;
    sdk = 'PlaceholderImage';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.PlaceholderImageError = PlaceholderImageError;
//# sourceMappingURL=PlaceholderImageError.js.map