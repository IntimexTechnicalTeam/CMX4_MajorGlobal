import Currency from './currency';

export default class YouWouldLike {
  private _Sku : string = '';
  public get Sku () : string {
    return this._Sku;
  }
  public set Sku (v : string) {
    this._Sku = v;
  }
  private _Name : string = '';
  public get Name () : string {
    return this._Name;
  }
  public set Name (v : string) {
    this._Name = v;
  }

  private _Img : string = '';
  public get Img () : string {
    return this._Img;
  }
  public set Img (v : string) {
    this._Img = v;
  }

  // private _AdditionalImage : string[];
  // public get AdditionalImage() : string[] {
  //   return this._AdditionalImage;
  // }
  // public set AdditionalImage(v : string[]) {
  //   this._AdditionalImage = v;
  // }

  private _Image : string = '';
  public get Image () : string {
    return this._Image;
  }
  public set Image (v : string) {
    this._Image = v;
  }
  private _Code : string = '';
  public get Code () : string {
    return this._Code;
  }
  public set Code (v : string) {
    this._Code = v;
  }
  private _ListPrice : string = '';
  public get ListPrice () : string {
    return this._ListPrice;
  }
  public set ListPrice (v : string) {
    this._ListPrice = v;
  }
  private _SalePrice : string = '';
  public get SalePrice () : string {
    return this._SalePrice;
  }
  public set SalePrice (v : string) {
    this._SalePrice = v;
  }

  private _Currency : Currency = new Currency();
  public get Currency () : Currency {
    return this._Currency;
  }
  public set Currency (v : Currency) {
    this._Currency = v;
  }

  public virtual: boolean = false;
  constructor (
    id: any,
    src: string = '',
    title: string = '',
    productCode: string = '',
    primePrice: string = '',
    presentPrice: string = '',
    currency: Currency = new Currency(),
    virtual: boolean = false
  ) {
    if (typeof id === 'string') { this._constructorDefault(id, src, title, productCode, primePrice, presentPrice, currency, virtual); } else if (typeof src === 'object') { this._constructorArray(src); }
  }
  _constructorDefault (
    id: string,
    src: string = '',
    title: string = '',
    productCode: string = '',
    primePrice: string = '',
    presentPrice: string = '',
    currency: Currency = new Currency(),
    virtual: boolean = false) {
    this._Sku = id;
    this._Image = src;
    this._Img = src;
    this._Name = title;
    this._Code = productCode;
    this._ListPrice = primePrice;
    this._SalePrice = presentPrice;
    this._Currency = currency;
    this.virtual = virtual;
  }
  _constructorArray (item:any) {
    if (item.id === undefined || item.src === undefined || item.title === undefined || item.productCode === undefined || item.primePrice === undefined || item.presentPrice === undefined) { throw new Error('params error : class YouWouldLike must contains src,title,productCode,primePrice,presentPrice,virtual'); }
    this._Sku = item.id;
    this._Image = item.src;
    this._Img = item.src;
    this._Name = item.title;
    this._Code = item.productCode;
    this._ListPrice = item.primePrice;
    this._SalePrice = item.presentPrice;
    this._Currency = item.currency;
    this.virtual = item.virtual;
  }
}
