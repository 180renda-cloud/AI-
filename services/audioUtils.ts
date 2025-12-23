export const decodeBase64 = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const createAudioBufferFromPCM = (
  pcmData: Uint8Array,
  audioContext: AudioContext,
  sampleRate: number = 24000
): AudioBuffer => {
  const numChannels = 1;
  const dataInt16 = new Int16Array(pcmData.buffer);
  const frameCount = dataInt16.length / numChannels;
  const audioBuffer = audioContext.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = audioBuffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return audioBuffer;
};