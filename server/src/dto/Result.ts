export interface IResult {
    message?: string;
    data?: any;
}

export class Result {
    data: any;
    message: string;
    constructor(result: IResult) {
        this.data = result.data;
        this.message = result.message;
    }
}
