import { StavkaKatalogaDto } from './stavkaKataloga';

export interface KatalogDto {
    katalogId: number;
    datumOd: Date;
    datumDo: Date;
    naziv: string;
    status: string;
    stavkeKataloga: StavkaKatalogaDto[];

}
