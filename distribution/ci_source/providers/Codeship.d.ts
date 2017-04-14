import { Env, CISource } from "../ci_source"
export declare class Codeship implements CISource {
    private readonly env
    private default
    constructor(env: Env);
    setup(): Promise<any>
    readonly name: string
    readonly isCI: boolean
    readonly isPR: boolean
    readonly pullRequestID: string
    readonly repoSlug: string
    readonly supportedPlatforms: string[]
    private readonly branchName
}
