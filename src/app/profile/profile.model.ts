export class Profile {
    constructor(
        public id?: number,
        public firstname?: string,
        public lastname?: string,
        public email?: string,
        public password?:string,
        public isactive?: boolean,
        public role?:string
    ) {
    }
}