import { IAudioMetadata } from "music-metadata";

// create a store class that will be used to store the state of the IAudioMetadata objects
class AudioMetadataStore {
  private audioMetadata: IAudioMetadata[] = [];

  add(metadata: IAudioMetadata): void {
    this.audioMetadata.push(metadata);
  }

  getAll(): IAudioMetadata[] {
    return this.audioMetadata;
  }

  findByTitle(title: string): IAudioMetadata | undefined {
    return this.audioMetadata.find(
      (metadata) => metadata.common.title === title
    );
  }

  removeByTitle(title: string): void {
    this.audioMetadata = this.audioMetadata.filter(
      (metadata) => metadata.common.title !== title
    );
  }

  clear(): void {
    this.audioMetadata = [];
  }
}

export const audioMetadataStore = new AudioMetadataStore();
