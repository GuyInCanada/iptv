import axios, { AxiosProxyConfig, AxiosRequestConfig } from 'axios'
import { parse as parsePlaylist, setOptions } from 'hls-parser'
import { parse as parseManifest } from 'mpd-parser'
import { SocksProxyAgent } from 'socks-proxy-agent'
import { ProxyParser } from './core/proxyParser.js'
import { TESTING } from './constants.js'
import normalizeUrl from 'normalize-url'
import { orderBy } from 'es-toolkit'
import path from 'node:path'
import fs from 'node:fs'

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

type StreamInfo = {
  resolution: { width: number; height: number }
  bandwidth: number
  frameRate: number
  codecs: string
}

export async function getStreamInfo(
  url: string,
  options: {
    httpUserAgent?: string | null
    httpReferrer?: string | null
    timeout?: number
    proxy?: string
  }
): Promise<StreamInfo | undefined> {
  let data: string | undefined
  if (TESTING) {
    if (url.includes('.m3u8')) {
      data = fs.readFileSync(
        path.resolve(__dirname, '../tests/__data__/input/playlist_update/playlist.m3u8'),
        'utf8'
      )
    } else if (url.includes('.mpd')) {
      data = fs.readFileSync(
        path.resolve(__dirname, '../tests/__data__/input/playlist_update/manifest.mpd'),
        'utf8'
      )
    }
  } else {
    try {
      const timeout = options.timeout || 1000
      let request: AxiosRequestConfig = {
        signal: AbortSignal.timeout(timeout),
        responseType: 'text',
        headers: {
          'User-Agent': options.httpUserAgent || 'Mozilla/5.0',
          Referer: options.httpReferrer
        }
      }

      if (options.proxy !== undefined) {
        const proxyParser = new ProxyParser()
        const proxy = proxyParser.parse(options.proxy) as AxiosProxyConfig
        if (
          proxy.protocol &&
          ['socks', 'socks5', 'socks5h', 'socks4', 'socks4a'].includes(String(proxy.protocol))
        ) {
          const socksProxyAgent = new SocksProxyAgent(options.proxy)

          request = { ...request, ...{ httpAgent: socksProxyAgent, httpsAgent: socksProxyAgent } }
        } else {
          request = { ...request, ...{ proxy } }
        }
      }

      const response = await axios(url, request)

      data = response.data
    } catch {}
  }

  if (!data) return undefined

  let info: StreamInfo | undefined

  if (url.includes('.m3u8')) {
    setOptions({ silent: true })

    try {
      const playlist = parsePlaylist(data)

      if (playlist && playlist.isMasterPlaylist && playlist.variants.length) {
        const v = orderBy(playlist.variants, ['bandwidth'], ['desc'])[0]

        if (v && v.resolution && v.frameRate && v.codecs) {
          info = {
            resolution: { width: v.resolution.width, height: v.resolution.height },
            bandwidth: v.bandwidth,
            frameRate: v.frameRate,
            codecs: v.codecs
          }
        }
      }
    } catch {}
  } else if (url.includes('.mpd')) {
    const manifest = parseManifest(data, {
      manifestUri: url,
      eventHandler: ({ type, message }) => console.log(`${type}: ${message}`)
    })

    const playlist = orderBy(manifest.playlists, [p => p.attributes.BANDWIDTH], ['desc'])[0]

    if (playlist) {
      const attr = playlist.attributes

      info = {
        resolution: { width: attr.RESOLUTION.width, height: attr.RESOLUTION.height },
        bandwidth: attr.BANDWIDTH,
        frameRate: attr['FRAME-RATE'],
        codecs: attr.CODECS
      }
    }
  }

  return info
}
