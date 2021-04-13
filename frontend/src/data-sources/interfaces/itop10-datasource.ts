import { INameValue } from "../../models/name-value";
import { Realtor } from "../../models/realtor";

export interface ITop10DataSource {
	/**
	 * Retrieves top 10 results from the backend
	 *
	 * @return {*}  {Promise<Array<Realtor>>} A top 10 list of realtors
	 * @memberof ITop10DataSource
	 */
	get(): Promise<Array<Realtor>>;

	/**
	 * Converts a realtor to a simple INameValue object, for viewing
	 *
	 * @param {Realtor} realtor
	 * @return {*}  {INameValue}
	 * @memberof ITop10DataSource
	 */
	toNameValue(realtor: Realtor): INameValue;
}