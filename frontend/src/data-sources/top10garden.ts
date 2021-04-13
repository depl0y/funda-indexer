import axios from "axios";
import { JsonConvert } from "json2typescript";
import { INameValue } from "../models/name-value";
import { Realtor } from "../models/realtor";
import { ITop10DataSource } from "./interfaces/itop10-datasource";

export class Top10GardenDataSource implements ITop10DataSource {

	public async get(): Promise<Array<Realtor>> {
		const url = 'http://localhost:19428/realtor/top10garden';
		const response = await axios.get(url);
		const jsonConvert = new JsonConvert();
		const result = jsonConvert.deserializeArray(response.data, Realtor);

		return result;
	}

	public toNameValue(realtor: Realtor): INameValue {
		return {
			amount: realtor.objectsWithGarden,
			name: realtor.name,
		};
	}
}