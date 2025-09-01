import { type NextRequest, NextResponse } from "next/server"
import { getProjectContent } from "@/lib/content"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const projectId = searchParams.get("project")

  if (!projectId) {
    return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
  }

  try {
    const projectContent = getProjectContent(projectId)

    if (!projectContent) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const rpcEndpoint = projectContent.endpoints.rpc[0] // Use first RPC endpoint

    if (!rpcEndpoint) {
      return NextResponse.json({ error: "No RPC endpoint configured for this project" }, { status: 400 })
    }

    console.log("[v0] Server-side fetching block height from:", `${rpcEndpoint}/block`)

    const response = await fetch(`${rpcEndpoint}/block`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    const responseText = await response.text()
    console.log("[v0] Raw RPC response:", responseText.substring(0, 200) + "...")

    if (!response.ok) {
      console.log("[v0] RPC response not ok:", response.status, response.statusText)
      return NextResponse.json(
        { error: `RPC error: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.log("[v0] JSON parse error:", parseError)
      console.log("[v0] Response was not valid JSON:", responseText)
      return NextResponse.json({ error: "RPC returned invalid JSON response" }, { status: 500 })
    }

    console.log("[v0] Successfully parsed RPC response, extracting block height...")

    const blockHeight = data?.result?.block?.header?.height

    if (!blockHeight) {
      console.log("[v0] Block height not found in response structure:", JSON.stringify(data, null, 2))
      return NextResponse.json({ error: "Block height not found in response" }, { status: 500 })
    }

    console.log("[v0] Block height extracted:", blockHeight)

    return NextResponse.json({
      height: blockHeight,
      success: true,
    })
  } catch (error) {
    console.error("[v0] Server-side error fetching block height:", error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 })
  }
}
