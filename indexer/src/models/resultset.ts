import { JsonObject, JsonProperty } from 'json2typescript';
import { FundaObject } from './funda-object';
import { Paging } from './paging';

@JsonObject('ResultSet')
export class ResultSet {
	@JsonProperty('Paging', Paging)
	public paging: Paging = new Paging();

	@JsonProperty('Objects', [FundaObject])
	public objects: Array<FundaObject> = [];
}