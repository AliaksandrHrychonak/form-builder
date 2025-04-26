export interface IPhoto {
    readonly bucket: string;
    readonly path: string;
    readonly pathWithFilename: string;
    readonly filename: string;
    readonly completedUrl: string;
    readonly baseUrl: string;
    readonly mime: string;
    readonly duration?: number;
    readonly size: number;
}
