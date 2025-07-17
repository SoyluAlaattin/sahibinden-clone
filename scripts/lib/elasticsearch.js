"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elasticClient = void 0;
var elasticsearch_1 = require("@elastic/elasticsearch");
exports.elasticClient = new elasticsearch_1.Client({
    node: 'http://localhost:9200',
});
