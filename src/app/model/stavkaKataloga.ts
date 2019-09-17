import { IgrackaDto } from './igracka';
import {StavkaKatalogaId } from './stavkaKatalogaId';

export interface StavkaKatalogaDto {
 stavkaKatalogaId: StavkaKatalogaId;
 igracka: IgrackaDto;
}
