
export class Template {
	public name: string;
	public body: string;
	public properties: string[];
	public user_id: number; 

	constructor(name, body, properties=[], user_id=null) {
		this.name = name;
		this.body = body;
		this.properties = properties,
		this.user_id = user_id
	}
}