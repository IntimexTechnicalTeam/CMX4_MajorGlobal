export default class Catelog {
    private _start : string;
    public get start () : string {
      return this._start;
    }
    public set start (v : string) {
      this._start = v;
    }

    private _end : string;
    public get end () : string {
      return this._end;
    }
    public set end (v : string) {
      this._end = v;
    }

    private _title : string;
    public get title () : string {
      return this._title;
    }
    public set title (v : string) {
      this._title = v;
    }

    constructor (_start = '', _end = '', _title = '') {
      this._start = _start;
      this._end = _end;
      this._title = _title;
    }
}
