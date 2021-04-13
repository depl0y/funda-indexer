import { INameValue } from "../models/name-value";

interface IProperties {
	values: Array<INameValue>;
}

export const NameValueTable = (props: IProperties) => {

	const row = (realtor: INameValue) => {
		return (
			<tr key={realtor.name}>
				<td>{realtor.name}</td>
				<td className="center">{realtor.amount}</td>
			</tr>
		)
	}

	const rows = () => {
		return props.values.map(r => row(r));
	}

	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Objects</th>
				</tr>
			</thead>
			<tbody>
				{rows()}
			</tbody>
		</table>
	)

}