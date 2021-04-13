import { useEffect, useState } from "react";
import { ITop10DataSource } from "../data-sources/interfaces/itop10-datasource";
import { INameValue } from "../models/name-value";
import { NameValueTable } from "./name-value-table";

interface IProperties {
	title: string;
	datasource: ITop10DataSource;
}

export const Top10view = (props: IProperties) => {
	const [realtors, setRealtors] = useState<Array<INameValue>>([]);
	const datasource = props.datasource;

	useEffect(() => {
		datasource.get().then(result => {

			setRealtors(result.map(r => datasource.toNameValue(r)));

		}).catch(reasons => {
			console.error('Query failed', reasons);
		});

	}, [datasource]);

	return (
		<div>
			<h1>{props.title}</h1>
			<NameValueTable values={realtors} />
		</div>
	)
}