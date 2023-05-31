export default class Currency {
    private _Code : string;
    public get Code () : string {
      return this._Code;
    }
    public set Code (v : string) {
      this._Code = v;
    }

    private _Desc : string;
    public get Desc () : string {
      return this._Desc;
    }
    public set Desc (v : string) {
      this._Desc = v;
    }

    private _Id : number;
    public get Id () : number {
      return this._Id;
    }
    public set Id (v : number) {
      this._Id = v;
    }

    private _Name : string;
    public get Name () : string {
      return this._Name;
    }
    public set Name (v : string) {
      this._Name = v;
    }
    constructor (_Code:string = 'HKD', _Desc:string = '', _Id:number = 1, _Name:string = 'HKD') {
      this._Code = _Code;
      this._Desc = _Desc;
      this._Id = _Id;
      this._Name = _Name;
    }
}
