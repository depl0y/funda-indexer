import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Paging')
export class Paging {
	@JsonProperty('AantalPaginas', Number)
	public pages = 0;
}
