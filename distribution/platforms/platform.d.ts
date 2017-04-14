import { Env, CISource } from "../ci_source/ci_source"
import { GitDSL } from "../dsl/GitDSL"
/** A type that represents the downloaded metadata about a code review session */
export declare type Metadata = any
/** A type that represents a comment */
export declare type Comment = {
    /**
     *  UUID for the comment
     *
     * @type {string}
     */
    id: string;
    /**
     * Textual representation of comment
     *
     * @type {string} body string
     */
    body: string;
    /**
     * Was this posted by the account Danger has access to?
     *
     * @type {boolean} true if Danger can edit
     */
    ownedByDanger: boolean;
}
export interface Platform {
    /** Mainly for logging and error reporting */
    readonly name: string
    /** Pulls in the platform specific metadata for inspection */
    getPlatformDSLRepresentation: () => Promise<any>
    /** Pulls in the Code Review Diff, and offers a succinct user-API for it */
    getPlatformGitRepresentation: () => Promise<GitDSL>
    /** Creates a comment on the PR */
    createComment: (body: string) => Promise<any>
    /** Delete the main Danger comment */
    deleteMainComment: () => Promise<boolean>
    /** Replace the main Danger comment */
    editMainComment: (newComment: string) => Promise<any>
    /** Replace the main Danger comment */
    updateOrCreateComment: (newComment: string) => Promise<any>
}
/**
 * Pulls out a platform for Danger to communicate on based on the environment
 * @param {Env} env The environment.
 * @param {CISource} source The existing source, to ensure they can run against each other
 * @returns {Platform} returns a platform if it can be supported
 */
export declare function getPlatformForEnv(env: Env, source: CISource): Platform
