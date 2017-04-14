import { Env, CISource } from "../ci_source"
export declare class Buildkite implements CISource {
    private readonly env
    constructor(env: Env);
    readonly name: string
    readonly isCI: boolean
    readonly isPR: boolean
    private _parseRepoURL()
    readonly pullRequestID: string
    readonly repoSlug: string
    readonly supportedPlatforms: string[]
}
