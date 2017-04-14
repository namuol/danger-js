"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Travis_1 = require("./Travis");
var Circle_1 = require("./Circle");
var Semaphore_1 = require("./Semaphore");
var Jenkins_1 = require("./Jenkins");
var Fake_1 = require("./Fake");
var Surf_1 = require("./Surf");
var DockerCloud_1 = require("./DockerCloud");
var Codeship_1 = require("./Codeship");
var Drone_1 = require("./Drone");
var Buildkite_1 = require("./Buildkite");
var providers = [Travis_1.Travis, Circle_1.Circle, Semaphore_1.Semaphore, Jenkins_1.Jenkins, Fake_1.FakeCI, Surf_1.Surf, DockerCloud_1.DockerCloud, Codeship_1.Codeship, Drone_1.Drone, Buildkite_1.Buildkite];
exports.providers = providers;
// Mainly used for Dangerfile linting
var realProviders = [Travis_1.Travis, Circle_1.Circle, Semaphore_1.Semaphore, Jenkins_1.Jenkins, Surf_1.Surf, DockerCloud_1.DockerCloud, Codeship_1.Codeship, Drone_1.Drone, Buildkite_1.Buildkite];
exports.realProviders = realProviders;
//# sourceMappingURL=index.js.map