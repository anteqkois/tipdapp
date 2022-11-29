"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = exports.isOperational = exports.createApiError = exports.createValidationError = exports.createValidationErrors = exports.ValidationErrors = exports.ValidationError = exports.ApiError = exports.catchErrors = exports.catchAsyncErrors = exports.notFound = void 0;
var logger_1 = require("../config/logger");
var zod_1 = require("../config/zod");
var notFound = function (req, res, next) {
    logger_1.requestLogger.error('not found', {
        url: req.url,
        method: req.method,
        host: req.hostname,
    });
    var err = new ApiError('Api endpoint not found', 404);
    err.status = 404;
    next(err);
};
exports.notFound = notFound;
var catchAsyncErrors = function (handler) {
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, handler(req, res, next)];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    error_1 = _a.sent();
                    next(error_1);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); };
};
exports.catchAsyncErrors = catchAsyncErrors;
var catchErrors = function (handler) {
    return function (req, res, next) {
        try {
            handler(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.catchErrors = catchErrors;
var ApiError = (function (_super) {
    __extends(ApiError, _super);
    function ApiError(message, status) {
        var _this = _super.call(this) || this;
        _this.type = 'ApiError';
        _this.isOperational = true;
        _this.status = status !== null && status !== void 0 ? status : 400;
        _this.message = message;
        return _this;
    }
    return ApiError;
}(Error));
exports.ApiError = ApiError;
var ValidationError = (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(field, title, message, code, status) {
        var _this = _super.call(this) || this;
        _this.type = 'ValidationError';
        _this.isOperational = true;
        _this.field = field;
        _this.title = title;
        _this.message = message;
        _this.code = code;
        _this.status = status !== null && status !== void 0 ? status : 422;
        return _this;
    }
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
var ValidationErrors = (function (_super) {
    __extends(ValidationErrors, _super);
    function ValidationErrors(errors, status) {
        var _this = _super.call(this) || this;
        _this.type = 'ValidationErrors';
        _this.isOperational = true;
        _this.errors = errors;
        _this.status = status !== null && status !== void 0 ? status : 422;
        return _this;
    }
    ValidationErrors.fromZodErrorArray = function (zodErrorArray, status) {
        var errors = [];
        zodErrorArray.forEach(function (zodError) {
            var error = new ValidationError(zodError.path[0], zodError.path[0], zodError.message, "".concat(zodError.path[0], ".").concat(zodError.code));
            errors.push(error);
        });
        return new this(errors, status);
    };
    return ValidationErrors;
}(Error));
exports.ValidationErrors = ValidationErrors;
var createValidationErrors = function (errors, status) {
    throw new ValidationErrors(errors, status);
};
exports.createValidationErrors = createValidationErrors;
var createValidationError = function (message, title, field, code) {
    throw new ValidationError(field, title, message, code);
};
exports.createValidationError = createValidationError;
var createApiError = function (message, status) {
    throw new ApiError(message, status);
};
exports.createApiError = createApiError;
var isOperational = function (err, helpMessage) {
    if ((err === null || err === void 0 ? void 0 : err.isOperational) ||
        err instanceof zod_1.ZodError) {
        throw err;
    }
    else if (helpMessage) {
        console.log(err);
        (0, exports.createApiError)(helpMessage);
    }
    logger_1.errorLogger.error('no operational', err);
    throw err;
};
exports.isOperational = isOperational;
var handleErrors = function (err, req, res, next) {
    if (err.type === 'ApiError' || err.type === 'ValidationError') {
        logger_1.errorLogger.error('', err);
        return res.status(err.status || 500).send({ error: [err] });
    }
    if (err.type === 'ValidationErrors') {
        logger_1.errorLogger.error('ValidationErrors', err.errors);
        return res.status(err.status || 500).json({ error: err.errors });
    }
    if (err instanceof zod_1.ZodError) {
        logger_1.errorLogger.error('ZodError', ValidationErrors.fromZodErrorArray(err.issues).errors);
        return res.status(422).json({
            error: ValidationErrors.fromZodErrorArray(err.issues).errors,
        });
    }
    logger_1.errorLogger.error('no operational', err);
    return res
        .status(err.status || 500)
        .json(err.message || 'Something went wrong, try later.');
};
exports.handleErrors = handleErrors;
exports.default = {
    notFound: exports.notFound,
    createApiError: exports.createApiError,
    createValidationErrors: exports.createValidationErrors,
    catchErrors: exports.catchErrors,
    catchAsyncErrors: exports.catchAsyncErrors,
    ApiError: ApiError,
    ValidationError: ValidationError,
    handleErrors: exports.handleErrors,
};
