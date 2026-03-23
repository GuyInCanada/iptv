import { MasterPlaylist, MediaPlaylist, Variant } from 'hls-parser/types'
import { parse as parsePlaylist } from 'hls-parser'
import { TESTING } from './constants.js'
import normalizeUrl from 'normalize-url'
import { orderBy } from 'es-toolkit'
import axios from 'axios'

export function isURI(string: string): boolean {
  try {
    const url = new URL(string)
    return /^(http:|https:|mmsh:|rtsp:|rtmp:)/.test(url.protocol)
  } catch {
    return false
  }
}

export function normalizeURL(url: string): string {
  const normalized = normalizeUrl(url, { stripWWW: false })

  return decodeURIComponent(normalized).replace(/\s/g, '+').toString()
}

export function truncate(string: string, limit: number = 100) {
  if (!string) return string
  if (string.length < limit) return string

  return string.slice(0, limit - 3) + '...'
}

export async function getStreamInfo(
  url: string,
  options: { httpUserAgent: string | null; httpReferrer: string | null }
): Promise<Variant | undefined> {
  let playlist: MasterPlaylist | MediaPlaylist | undefined

  if (TESTING) {
    playlist = (await import('../tests/__data__/input/playlist_update/playlist.mjs'))
      .default as unknown as MasterPlaylist
  } else {
    try {
      const response = await axios(url, {
        signal: AbortSignal.timeout(30000),
        headers: {
          'User-Agent': options.httpUserAgent || 'Mozilla/5.0',
          Referer: options.httpReferrer
        }
      })

      playlist = parsePlaylist(response.data)
    } catch {}
  }

  if (playlist && playlist.isMasterPlaylist && playlist.variants.length) {
    return orderBy(playlist.variants, ['bandwidth'], ['desc'])[0]
  }

  return undefined
}
