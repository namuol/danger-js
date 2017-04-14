"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var os = require("os");
var parseDiff = require("parse-diff");
// At what point should we just import lodash?
var includes = require("lodash.includes");
var isobject = require("lodash.isobject");
var keys = require("lodash.keys");
var jsonDiff = require("rfc6902");
var jsonpointer = require("jsonpointer");
/**
 * Returns the response for the new comment
 *
 * @param {GitHubCommit} ghCommit A GitHub based commit
 * @returns {GitCommit} a Git commit representation without GH metadata
 */
function githubCommitToGitCommit(ghCommit) {
    return {
        sha: ghCommit.sha,
        parents: ghCommit.parents.map(function (p) { return p.sha; }),
        author: ghCommit.commit.author,
        committer: ghCommit.commit.committer,
        message: ghCommit.commit.message,
        tree: ghCommit.commit.tree,
        url: ghCommit.url
    };
}
function gitDSLForGitHub(api) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var pr, diff, getCommits, fileDiffs, addedDiffs, removedDiffs, modifiedDiffs, JSONPatchForFile, JSONDiffForFile, byType, getContent, diffForFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.getPullRequestInfo()];
                case 1:
                    pr = _a.sent();
                    return [4 /*yield*/, api.getPullRequestDiff()];
                case 2:
                    diff = _a.sent();
                    return [4 /*yield*/, api.getPullRequestCommits()];
                case 3:
                    getCommits = _a.sent();
                    fileDiffs = parseDiff(diff);
                    addedDiffs = fileDiffs.filter(function (diff) { return diff["new"]; });
                    removedDiffs = fileDiffs.filter(function (diff) { return diff["deleted"]; });
                    modifiedDiffs = fileDiffs.filter(function (diff) { return !includes(addedDiffs, diff) && !includes(removedDiffs, diff); });
                    JSONPatchForFile = function (filename) { return __awaiter(_this, void 0, void 0, function () {
                        var modified, baseFile, headFile, baseJSON, headJSON;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    modified = modifiedDiffs.find(function (diff) { return diff.to === filename; });
                                    if (!modified) {
                                        return [2 /*return*/, null];
                                    }
                                    return [4 /*yield*/, api.fileContents(filename, pr.base.repo.full_name, pr.base.sha)];
                                case 1:
                                    baseFile = _a.sent();
                                    return [4 /*yield*/, api.fileContents(filename, pr.head.repo.full_name, pr.head.sha)];
                                case 2:
                                    headFile = _a.sent();
                                    if (baseFile && headFile) {
                                        baseJSON = JSON.parse(baseFile);
                                        headJSON = JSON.parse(headFile);
                                        // Tiny bit of hand-waving here around the types. JSONPatchOperation is
                                        // a simpler version of all operations inside the rfc6902 d.ts. Users
                                        // of danger wont care that much, so I'm smudging the classes slightly
                                        // to be ones we can add to the hosted docs.
                                        return [2 /*return*/, {
                                                before: baseJSON,
                                                after: headJSON,
                                                diff: jsonDiff.createPatch(baseJSON, headJSON)
                                            }];
                                    }
                                    return [2 /*return*/, null];
                            }
                        });
                    }); };
                    JSONDiffForFile = function (filename) { return __awaiter(_this, void 0, void 0, function () {
                        var patchObject, diff, before, after;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, JSONPatchForFile(filename)];
                                case 1:
                                    patchObject = _a.sent();
                                    if (!patchObject) {
                                        return [2 /*return*/, {}];
                                    }
                                    diff = patchObject.diff, before = patchObject.before, after = patchObject.after;
                                    return [2 /*return*/, diff.reduce(function (accumulator, _a) {
                                            var path = _a.path;
                                            // We don't want to show the last root object, as these tend to just go directly
                                            // to a single value in the patch. This is fine, but not useful when showing a before/after
                                            var pathSteps = path.split("/");
                                            var backAStepPath = pathSteps.length <= 2 ? path : pathSteps.slice(0, pathSteps.length - 1).join("/");
                                            var diff = {
                                                after: jsonpointer.get(after, backAStepPath),
                                                before: jsonpointer.get(before, backAStepPath),
                                            };
                                            // If they both are arrays, add some extra metadata about what was
                                            // added or removed. This makes it really easy to act on specific
                                            // changes to JSON DSLs
                                            if (Array.isArray(diff.after) && Array.isArray(diff.before)) {
                                                var arrayBefore_1 = diff.before;
                                                var arrayAfter_1 = diff.after;
                                                diff.added = arrayAfter_1.filter(function (o) { return !includes(arrayBefore_1, o); });
                                                diff.removed = arrayBefore_1.filter(function (o) { return !includes(arrayAfter_1, o); });
                                                // Do the same, but for keys inside an object if they both are objects.
                                            }
                                            else if (isobject(diff.after) && isobject(diff.before)) {
                                                var beforeKeys_1 = keys(diff.before);
                                                var afterKeys_1 = keys(diff.after);
                                                diff.added = afterKeys_1.filter(function (o) { return !includes(beforeKeys_1, o); });
                                                diff.removed = beforeKeys_1.filter(function (o) { return !includes(afterKeys_1, o); });
                                            }
                                            jsonpointer.set(accumulator, backAStepPath, diff);
                                            return accumulator;
                                        }, Object.create(null))];
                            }
                        });
                    }); };
                    byType = function (t) { return function (_a) {
                        var type = _a.type;
                        return type === t;
                    }; };
                    getContent = function (_a) {
                        var content = _a.content;
                        return content;
                    };
                    diffForFile = function (filename) { return __awaiter(_this, void 0, void 0, function () {
                        var structuredDiff, allLines, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    structuredDiff = modifiedDiffs.find(function (diff) { return diff.from === filename || diff.to === filename; });
                                    if (!structuredDiff) {
                                        return [2 /*return*/, null];
                                    }
                                    allLines = structuredDiff.chunks
                                        .map(function (c) { return c.changes; })
                                        .reduce(function (a, b) { return a.concat(b); }, []);
                                    _a = {};
                                    return [4 /*yield*/, api.fileContents(filename, pr.base.repo.full_name, pr.base.sha)];
                                case 1:
                                    _a.before = _b.sent();
                                    return [4 /*yield*/, api.fileContents(filename, pr.head.repo.full_name, pr.head.sha)];
                                case 2: return [2 /*return*/, (_a.after = _b.sent(),
                                        _a.diff = allLines.map(getContent).join(os.EOL),
                                        _a.added = allLines.filter(byType("add")).map(getContent).join(os.EOL),
                                        _a.removed = allLines.filter(byType("del")).map(getContent).join(os.EOL),
                                        _a)];
                            }
                        });
                    }); };
                    return [2 /*return*/, {
                            modified_files: modifiedDiffs.map(function (d) { return d.to; }),
                            created_files: addedDiffs.map(function (d) { return d.to; }),
                            deleted_files: removedDiffs.map(function (d) { return d.from; }),
                            diffForFile: diffForFile,
                            commits: getCommits.map(githubCommitToGitCommit),
                            JSONPatchForFile: JSONPatchForFile,
                            JSONDiffForFile: JSONDiffForFile
                        }];
            }
        });
    });
}
exports.default = gitDSLForGitHub;
//# sourceMappingURL=GitHubGit.js.map