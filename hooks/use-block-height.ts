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
    let ignore = false

    if (!projectId || projectId.trim() === "") {
      setHeight("Unavailable")
      setLoading(false)
      setError("Project not selected")
      return
    }

    const fetchBlockHeight = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/block-height?project=${encodeURIComponent(projectId)}`)
        let data: any = null

        // Try to parse JSON regardless of status code
        try {
          data = await response.json()
        } catch {
          data = null
        }

        if (!response.ok) {
          const errorMsg = (data && data.error) ? data.error : `HTTP error! status: ${response.status}`
          throw new Error(errorMsg)
        }

        if (data && data.success && data.height) {
          const formattedHeight = Number.parseInt(data.height).toLocaleString()
          if (!ignore) setHeight(formattedHeight)
        } else {
          throw new Error("Invalid response format")
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to fetch block height"
        if (!ignore) {
          setError(msg)
          setHeight("Unavailable")
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchBlockHeight()
    const interval = setInterval(fetchBlockHeight, 5000)
    return () => {
      ignore = true
      clearInterval(interval)
    }
  }, [projectId])

  return { height, loading, error }
}