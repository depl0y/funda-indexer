import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('FundaObject')
export class FundaObject {
	@JsonProperty('IsVerkocht', Boolean)
	public isSold = false;

	@JsonProperty('MakelaarId', Number)
	public realtorId = 0;

	@JsonProperty('MakelaarNaam', String)
	public realtorName = '';
}