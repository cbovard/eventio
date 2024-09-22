import { rpcHandler } from "@blitzjs/rpc"
import { api } from "src/app/blitz-server"

export default api(rpcHandler())

// import { rpcAppHandler } from "@blitzjs/rpc"
// import { withBlitzAuth } from "src/app/blitz-server"

// export const { GET, HEAD, POST } = withBlitzAuth(rpcAppHandler())
