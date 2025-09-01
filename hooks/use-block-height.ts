"use client"

import { useState, useEffect } from "react"

interface BlockHeightData {
  height: string
  loading: boolean
  error: string | null
}

export function useBlockHeight(projectId: string): BlockHeightData {
  const [height, setHeight] = useState<string>("Loading...")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("[v0] useBlockHeight called with projectId:", projectId)

    if (!projectId || projectId.trim() === "") {
      console.log("[v0] ProjectId is empty, skipping fetch")
      setHeight("Unavailable")
      setLoading(false)
      setError("Project not selected")
      return
    }

    const fetchBlockHeight = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log("[v0] Fetching block height for project:", projectId)

        const response = await fetch(`/api/block-height?project=${encodeURIComponent(projectId)}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.success && data.height) {
          const formattedHeight = Number.parseInt(data.height).toLocaleString()
          setHeight(formattedHeight)
          console.log("[v0] Successfully fetched block height:", formattedHeight)
        } else {
          throw new Error("Invalid response format")
        }
      } catch (err) {
        console.error("[v0] Error fetching block height:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch block height")
        setHeight("Unavailable")
      } finally {
        setLoading(false)
      }
    }

    fetchBlockHeight()
    const interval = setInterval(fetchBlockHeight, 5000)

    return () => clearInterval(interval)
  }, [projectId])

  return { height, loading, error }
}
