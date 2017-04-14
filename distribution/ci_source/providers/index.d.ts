import { Travis } from "./Travis"
import { Circle } from "./Circle"
import { Semaphore } from "./Semaphore"
import { Jenkins } from "./Jenkins"
import { FakeCI } from "./Fake"
import { Surf } from "./Surf"
import { DockerCloud } from "./DockerCloud"
import { Codeship } from "./Codeship"
import { Drone } from "./Drone"
import { Buildkite } from "./Buildkite"
declare const providers: (typeof Travis | typeof Circle | typeof Semaphore | typeof Jenkins | typeof FakeCI | typeof Surf | typeof DockerCloud | typeof Codeship | typeof Drone | typeof Buildkite)[]
declare const realProviders: (typeof Travis | typeof Circle | typeof Semaphore | typeof Jenkins | typeof Surf | typeof DockerCloud | typeof Codeship | typeof Drone | typeof Buildkite)[]
export { providers, realProviders }
