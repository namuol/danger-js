import { GitDSL } from "../dsl/GitDSL"
import { GitHubDSL } from "../dsl/GitHubDSL"
import { DangerUtilsDSL } from "./DangerUtilsDSL"
/**
 *  The Danger DSL provides the metadata for introspection
 *  in order to create your own rules.
 */
export interface DangerDSLType {
    /**
     *  Details specific to the git changes within the code changes.
     *  Currently, this is just the raw file paths that have been
     *  added, removed or modified.
     */
    readonly git: Readonly<GitDSL>
    /**
     *  The GitHub metadata.
     */
    readonly github: Readonly<GitHubDSL>
    /**
     * Danger utils
     */
    readonly utils: Readonly<DangerUtilsDSL>
}
export declare class DangerDSL {
    readonly git: GitDSL
    readonly utils: DangerUtilsDSL
    readonly github: Readonly<GitHubDSL>
    constructor(platformDSL: any, git: GitDSL, utils: DangerUtilsDSL);
}
