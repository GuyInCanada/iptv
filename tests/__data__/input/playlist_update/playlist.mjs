export default {
  type: 'playlist',
  isMasterPlaylist: true,
  independentSegments: true,
  source:
    '#EXTM3U\n## Generated with https://github.com/shaka-project/shaka-packager version v3.4.2-c819dea-release\n\n#EXT-X-INDEPENDENT-SEGMENTS\n\n#EXT-X-MEDIA:TYPE=AUDIO,URI="stream_4.m3u8",GROUP-ID="default-audio-group",LANGUAGE="pl",NAME="stream_4",DEFAULT=NO,AUTOSELECT=YES,CHANNELS="2"\n\n#EXT-X-STREAM-INF:BANDWIDTH=3688787,AVERAGE-BANDWIDTH=8948756,CODECS="avc1.424028,mp4a.40.2",RESOLUTION=1920x1080,FRAME-RATE=25.000,AUDIO="default-audio-group",CLOSED-CAPTIONS=NONE\nstream_0.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=1988787,AVERAGE-BANDWIDTH=3688345,CODECS="avc1.42401f,mp4a.40.2",RESOLUTION=1280x720,FRAME-RATE=25.000,AUDIO="default-audio-group",CLOSED-CAPTIONS=NONE\nstream_1.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=1188787,AVERAGE-BANDWIDTH=1774276,CODECS="avc1.42401e,mp4a.40.2",RESOLUTION=853x480,FRAME-RATE=25.000,AUDIO="default-audio-group",CLOSED-CAPTIONS=NONE\nstream_2.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=688787,AVERAGE-BANDWIDTH=766090,CODECS="avc1.42401e,mp4a.40.2",RESOLUTION=640x360,FRAME-RATE=25.000,AUDIO="default-audio-group",CLOSED-CAPTIONS=NONE\nstream_3.m3u8\n',
  variants: [
    {
      uri: 'stream_0.m3u8',
      isIFrameOnly: false,
      bandwidth: 3688787,
      averageBandwidth: 8948756,
      codecs: 'avc1.424028,mp4a.40.2',
      resolution: { width: 1920, height: 1080 },
      frameRate: 25,
      audio: [
        {
          type: 'AUDIO',
          uri: 'stream_4.m3u8',
          groupId: 'default-audio-group',
          language: 'pl',
          name: 'stream_4',
          isDefault: false,
          autoselect: true,
          channels: '2'
        }
      ],
      video: [],
      subtitles: [],
      closedCaptions: [],
      currentRenditions: { audio: 0, video: 0, subtitles: 0, closedCaptions: 0 }
    },
    {
      uri: 'stream_1.m3u8',
      isIFrameOnly: false,
      bandwidth: 1988787,
      averageBandwidth: 3688345,
      codecs: 'avc1.42401f,mp4a.40.2',
      resolution: { width: 1280, height: 720 },
      frameRate: 25,
      audio: [
        {
          type: 'AUDIO',
          uri: 'stream_4.m3u8',
          groupId: 'default-audio-group',
          language: 'pl',
          name: 'stream_4',
          isDefault: false,
          autoselect: true,
          channels: '2'
        }
      ],
      video: [],
      subtitles: [],
      closedCaptions: [],
      currentRenditions: { audio: 0, video: 0, subtitles: 0, closedCaptions: 0 }
    },
    {
      uri: 'stream_2.m3u8',
      isIFrameOnly: false,
      bandwidth: 1188787,
      averageBandwidth: 1774276,
      codecs: 'avc1.42401e,mp4a.40.2',
      resolution: { width: 853, height: 480 },
      frameRate: 25,
      audio: [
        {
          type: 'AUDIO',
          uri: 'stream_4.m3u8',
          groupId: 'default-audio-group',
          language: 'pl',
          name: 'stream_4',
          isDefault: false,
          autoselect: true,
          channels: '2'
        }
      ],
      video: [],
      subtitles: [],
      closedCaptions: [],
      currentRenditions: { audio: 0, video: 0, subtitles: 0, closedCaptions: 0 }
    },
    {
      uri: 'stream_3.m3u8',
      isIFrameOnly: false,
      bandwidth: 688787,
      averageBandwidth: 766090,
      codecs: 'avc1.42401e,mp4a.40.2',
      resolution: { width: 640, height: 360 },
      frameRate: 25,
      audio: [
        {
          type: 'AUDIO',
          uri: 'stream_4.m3u8',
          groupId: 'default-audio-group',
          language: 'pl',
          name: 'stream_4',
          isDefault: false,
          autoselect: true,
          channels: '2'
        }
      ],
      video: [],
      subtitles: [],
      closedCaptions: [],
      currentRenditions: { audio: 0, video: 0, subtitles: 0, closedCaptions: 0 }
    }
  ],
  sessionDataList: [],
  sessionKeyList: []
}
