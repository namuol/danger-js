import { api as fetch } from "../../api/fetch"
import { RepoMetaData } from "../../ci_source/ci_source"
import { GitHubPRDSL, GitHubUser } from "../../dsl/GitHubDSL"
import * as node_fetch from "node-fetch"
export declare type APIToken = string
/** This represent the GitHub API */
export declare class GitHubAPI {
    readonly repoMetadata: RepoMetaData
    readonly token: APIToken
    fetch: typeof fetch
    additionalHeaders: any
    constructor(repoMetadata: RepoMetaData, token?: APIToken);
    /**
     * Grabs the contents of an individual file on GitHub
     *
     * @param {string} path path to the file
     * @param {string} [ref] an optional sha
     * @returns {Promise<string>} text contents
     *
     */
    fileContents(path: string, repoSlug?: string, ref?: string): Promise<string>
    getDangerCommentID(): Promise<number | null>
    updateCommentWithID(id: number, comment: string): Promise<any>
    deleteCommentWithID(id: number): Promise<any>
    getUserID(): Promise<number>
    postPRComment(comment: string): Promise<any>
    getPullRequestInfo(): Promise<GitHubPRDSL>
    getPullRequestCommits(): Promise<any>
    getUserInfo(): Promise<GitHubUser>
    getPullRequestComments(): Promise<any>
    getPullRequestDiff(): Promise<string>
    getFileContents(path: string, repoSlug: string, ref: string): Promise<any>
    getPullRequests(): Promise<any>
    getReviewerRequests(): Promise<any>
    getReviews(): Promise<any>
    getIssue(): Promise<any>
    private api(path, headers, body, method)
    get(path: string, headers?: any, body?: any): Promise<node_fetch.Response>
    post(path: string, headers?: any, body?: any): Promise<node_fetch.Response>
    patch(path: string, headers?: any, body?: any): Promise<node_fetch.Response>
}
