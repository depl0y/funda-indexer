import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject('Realtor')
export class Realtor {
	@JsonProperty('id', Number)
	public id = 0;

	@JsonProperty('name', String)
	public name = '';

	@JsonProperty('objects', Number)
	public objects = 0;

	@JsonProperty('objectsWithGarden', Number)
	public objectsWithGarden = 0
}