"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var elasticsearch_1 = require("../lib/elasticsearch");
var ads = [
    {
        id: '1',
        title: 'Modern 3-Bedroom Apartment in Istanbul',
        price: '₺2,500,000',
        location: 'Istanbul, Turkey',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
        category: 'Real Estate',
        postedDate: '2 hours ago',
    },
    {
        id: '2',
        title: '2020 BMW 3 Series - Excellent Condition',
        price: '₺850,000',
        location: 'Ankara, Turkey',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
        category: 'Vehicles',
        postedDate: '1 day ago',
    },
    {
        id: '3',
        title: 'iPhone 15 Pro Max - 256GB',
        price: '₺45,000',
        location: 'Izmir, Turkey',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
        category: 'Electronics',
        postedDate: '3 hours ago',
    },
    {
        id: '4',
        title: 'Leather Sofa Set - Living Room Furniture',
        price: '₺12,000',
        location: 'Bursa, Turkey',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
        category: 'Furniture',
        postedDate: '5 hours ago',
    },
    {
        id: '5',
        title: 'Senior Software Developer Position',
        price: '₺25,000/month',
        location: 'Istanbul, Turkey',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
        category: 'Jobs',
        postedDate: '1 day ago',
    },
    {
        id: '6',
        title: 'Professional Cleaning Services',
        price: '₺200/hour',
        location: 'Antalya, Turkey',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
        category: 'Services',
        postedDate: '4 hours ago',
    },
];
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var index, exists, body, bulkResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 'ads';
                    return [4 /*yield*/, elasticsearch_1.elasticClient.indices.exists({ index: index })];
                case 1:
                    exists = _a.sent();
                    if (!!exists) return [3 /*break*/, 3];
                    return [4 /*yield*/, elasticsearch_1.elasticClient.indices.create({ index: index })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    body = ads.flatMap(function (doc) { return [{ index: { _index: index, _id: doc.id } }, doc]; });
                    return [4 /*yield*/, elasticsearch_1.elasticClient.bulk({ refresh: true, body: body })];
                case 4:
                    bulkResponse = _a.sent();
                    if (bulkResponse.errors) {
                        console.error('Bulk indexing errors:', bulkResponse.errors);
                    }
                    else {
                        console.log('Ads indexed successfully!');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
run().catch(console.error);
