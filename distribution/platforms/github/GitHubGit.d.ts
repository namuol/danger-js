import { GitDSL } from "../../dsl/GitDSL"
import { GitHubAPI } from "../github/GitHubAPI"
export default function gitDSLForGitHub(api: GitHubAPI): Promise<GitDSL>
