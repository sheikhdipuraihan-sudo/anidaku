import 'dart:typed_data';

class AacParser {
  int? samplingFrequencyIndex;
  int? channelConfiguration;
  int? audioObjectType;

  final BytesBuilder _buffer = BytesBuilder();
  int? _nextPts;
  int? _nextDts;

  List<ParsedAacFrame> processPes(List<int>? payload, int? pts, int? dts) {
    if (payload != null) {
      _buffer.add(payload);
    }
    
    if (pts != null) {
      _nextPts = pts;
      _nextDts = dts ?? pts;
    }

    final frames = <ParsedAacFrame>[];
    final data = _buffer.toBytes();
    int offset = 0;

    while (offset < data.length - 7) {
      if (data[offset] == 0xFF && (data[offset + 1] & 0xF0) == 0xF0) {
        final protectionAbsent = (data[offset + 1] & 0x01) == 1;
        final profile = (data[offset + 2] >> 6) & 0x03;
        final sfIndex = (data[offset + 2] >> 2) & 0x0F;
        final channelConfig = ((data[offset + 2] & 0x01) << 2) | ((data[offset + 3] >> 6) & 0x03);
        
        final frameLength = ((data[offset + 3] & 0x03) << 11) |
            (data[offset + 4] << 3) |
            ((data[offset + 5] >> 5) & 0x07);

        if (samplingFrequencyIndex == null) {
          audioObjectType = profile + 1;
          samplingFrequencyIndex = sfIndex;
          channelConfiguration = channelConfig;
        }

        int headerLength = protectionAbsent ? 7 : 9;
        
        if (offset + frameLength <= data.length) {
          final rawFrame = data.sublist(offset + headerLength, offset + frameLength);
          
          if (_nextPts != null && _nextDts != null) {
            frames.add(ParsedAacFrame(rawFrame, _nextPts!, _nextDts!));
            double sr = getSamplingRate();
            if (sr > 0) {
              int offsetPts = (1024 * 90000 ~/ sr);
              _nextPts = _nextPts! + offsetPts;
              _nextDts = _nextDts! + offsetPts;
            }
          }
          
          offset += frameLength;
        } else {
          break;
        }
      } else {
        offset++;
      }
    }

    if (offset > 0) {
      final remaining = data.sublist(offset);
      _buffer.clear();
      _buffer.add(remaining);
    }

    return frames;
  }

  List<int>? buildAudioSpecificConfig() {
    if (audioObjectType == null || samplingFrequencyIndex == null || channelConfiguration == null) {
      return null;
    }

    final b1 = (audioObjectType! << 3) | ((samplingFrequencyIndex! >> 1) & 0x07);
    final b2 = ((samplingFrequencyIndex! & 0x01) << 7) | (channelConfiguration! << 3);

    return [b1, b2];
  }

  double getSamplingRate() {
    switch (samplingFrequencyIndex) {
      case 0: return 96000;
      case 1: return 88200;
      case 2: return 64000;
      case 3: return 48000;
      case 4: return 44100;
      case 5: return 32000;
      case 6: return 24000;
      case 7: return 22050;
      case 8: return 16000;
      case 9: return 12000;
      case 10: return 11025;
      case 11: return 8000;
      case 12: return 7350;
      default: return 44100;
    }
  }
}

class ParsedAacFrame {
  final List<int> data;
  final int pts;
  final int dts;

  ParsedAacFrame(this.data, this.pts, this.dts);
}

