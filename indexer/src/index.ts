import Axios from "axios";
import * as fs from "fs";
import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";
import { JsonConvert, JsonObject, JsonProperty } from 'json2typescript';

const apiKey = 'ac1b0b1572524640a0ecc54de453ea9f ';
const url = `http://partnerapi.funda.nl/feeds/Aanbod.svc/json/${apiKey}/?type=koop`;
const dbFile = '../data/storage.sqlite';
const pageSize = 50;

//#region  Minimal classes to map data to, just to be type-safe here
@JsonObject('Paging')
export class Paging {
	@JsonProperty('AantalPaginas', Number)
	public pages = 0;
}

@JsonObject('FundaObject')
export class FundaObject {
	@JsonProperty('IsVerkocht', Boolean)
	public isSold = false;

	@JsonProperty('MakelaarId', Number)
	public realtorId = 0;

	@JsonProperty('MakelaarNaam', String)
	public realtorName = '';
}

@JsonObject('ResultSet')
export class ResultSet {
	@JsonProperty('Paging', Paging)
	public paging: Paging = new Paging();

	@JsonProperty('Objects', [FundaObject])
	public objects: Array<FundaObject> = [];
}
//#endregion

/**
 * Perform the query and deserialize the object into a Resultset
 *
 * @param {string} url The URL to 'get'.
 * @return {*}  {Promise<ResultSet>} The resultset
 */
const getQueryResults = async (url: string): Promise<ResultSet> => {
	const result = await Axios.get(url);

	const jsonConvert = new JsonConvert();
	const resultSet = jsonConvert.deserializeObject(result.data, ResultSet);
	return resultSet;
}

/**
 * Fetches makerlaar counts from the Funda API based on the supplied query, page and pagesize
 *
 * @param {string} zoekOpdracht The query to perform
 * @param {number} page Which page to fetch
 * @param {number} [pageSize=25] Amount of items per page
 */
const index = async (db: Database<sqlite3.Database, sqlite3.Statement>, zoekOpdracht: string, page: number, pageSize = 25, updateCallback: () => string): Promise<void> => {
	console.log('Indexing', zoekOpdracht, 'page', page);

	const pageUrl = `${url}&zo=${zoekOpdracht}&page=${page}&pagesize=${pageSize}`;

	const result = await getQueryResults(pageUrl);

	for (const object of result.objects) {
		const result = await db.get('SELECT * FROM realtors WHERE Id = ?', [object.realtorId]);

		if (!result) {
			await db.run('INSERT INTO realtors (Id, Name, Objects, ObjectsWithGarden) VALUES (?, ?, 0, 0)', object.realtorId, object.realtorName);
		}

		const statement = updateCallback();
		await db.run(statement, object.realtorId);
	}

	if (result.paging.pages > page) {
		await index(db, zoekOpdracht, page + 1, pageSize, updateCallback);
	}
};

/**
 * Create a database, if it exists, delete the previous one for nice clean results.
 *
 * @return {*}  {Promise<Database<sqlite3.Database, sqlite3.Statement>>} A database connection
 */
const createDatabase = async (): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
	if (fs.existsSync(dbFile)) {
		fs.unlinkSync(dbFile);
	}

	const db = await open({
		driver: sqlite3.Database,
		filename: dbFile
	});

	await db.run('CREATE TABLE IF NOT EXISTS realtors (Id INTEGER NOT NULL, Name TEXT NOT NULL, Objects INTEGER NOT NULL, ObjectsWithGarden INTEGER NOT NULL);');
	await db.run('CREATE INDEX idx_objects ON realtors (Objects);')
	await db.run('CREATE INDEX idx_objectsWithGarden ON realtors (ObjectsWithGarden);')

	return db;
}

/**
 * Start the indexing task
 *
 * @return {*}  {Promise<void>} A promise for when the task is done
 */
const start = async (): Promise<void> => {
	const db = await createDatabase();
	await index(db, '/amsterdam/', 1, pageSize, () => {
		return 'UPDATE realtors SET Objects = Objects + 1 WHERE Id = ?';
	});

	await index(db, '/amsterdam/tuin', 1, pageSize, () => {
		return 'UPDATE realtors SET ObjectsWithGarden = ObjectsWithGarden + 1 WHERE Id = ?';
	});

	const result = await db.get('SELECT SUM(Objects) as objectCount, SUM(ObjectsWithGarden) as gardenCount FROM realtors');
	console.log('Objects found', result.objectCount, ', Objects with garden found', result.gardenCount);

	console.log('Indexing done');
}

start();
